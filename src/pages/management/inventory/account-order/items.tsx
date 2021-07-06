import { FC, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Box, Button, TextField } from "@material-ui/core";
import {
	AccountOrder,
	AccountOrderItem,
	Inventory,
	Stock,
} from "../../../../lib/models-inventory";
import { FDate, FDateCustom, FDateTime, FDouble } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridRowId,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";

import Loading from "../../../../components/loading";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import PageCommands from "../../../../components/page-commands";
import { NotificationContext } from "../../../../lib/notifications";
import { StocksSelectDialog } from "../../../../components/data-select/stocks-select";
import { AmountField } from "../../../../components/amount-field";
import { InventorySelectDialog } from "../../../../components/data-select/inventory-select";

export interface IItemProps {
	refresh: Date;
	parent: AccountOrder;
}

const Items: FC<IItemProps> = ({ refresh, parent }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<AccountOrderItem[] | null>(null);
	const [dataBak, setDataBak] = useState<AccountOrderItem[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${g.API_URL}/inventory/order-items?parentId=${parent?.id}`
		);
		if (res.success) {
			setData(res.data);
			setDataBak(JSON.parse(JSON.stringify(res.data)));
		}
	};

	const getInventory = async () => {
		const res = await req.get(
			`${g.API_URL}/inventory/report?warehouseId=${
				parent.warehouseId
			}&date=${FDateCustom(parent.docDate, "MM-DD-YYYY")}`
		);
		if (res.success) {
			return res.data as Inventory[];
		} else {
			return null;
		}
	};

	const validate = async () => {
		let errors: string[] = [];

		const inv = await getInventory();
		if (inv == null) {
			errors.push("Unable to acquire inventory list");
		} else {
			data?.forEach((x) => {
				if (x.stock == null) {
					errors.push(
						`Stock Id# ${x.stockId} does not exist anymore. It was probably deleted. Please remove the item.`
					);
				} else if (x.qty <= 0) {
					errors.push(
						`Stock Id# ${x.stockId}/${x.stock?.stockName} Qty is invalid. Please specify a value greater than 0`
					);
				} else {
					const _inv = inv.find((y) => y.id == x.stockId);
					const q = _inv?.qty ?? 0;
					if (x.qty > q) {
						errors.push(
							`Stock Id# ${x.stockId}/${x.stock?.stockName} Qty is greater than available supply (${q})`
						);
					}
				}
			});
		}

		return errors;
	};

	const saveList = async () => {
		const errors = await validate();
		if (errors.length > 0) {
			nc.msgbox.show(errors, "Save items");
			return;
		}

		const res = await req.post(
			`${g.API_URL}/inventory/order-items/save?parentId=${parent?.id}`,
			data
		);

		if (res.success) {
			parent = res.data;

			nc.snackbar.show("Items were successfully saved");
			backToView();
		}
	};

	const isPrestine = () => JSON.stringify(data) == JSON.stringify(dataBak);

	const backToView = () => {
		(
			ps.Get("accountOrders-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: parent });
		(
			ps.Get("accountOrders-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("view");
	};

	const removeSelectedItems = () => {
		const newData =
			data?.filter((x) => selectionModel.find((y) => y == x.id) == null) ??
			null;

		setData(newData);
		setSelectionModel([]);
	};

	const handleAddItems = (value: Inventory[]) => {
		//max data id
		let maxId = 0;
		const lst = data
			?.map((x) => x.id)
			.sort()
			.reverse();
		if (lst && lst.length > 0) maxId = lst[0];

		const newItems: AccountOrderItem[] = value.map((x, i) => {
			return {
				id: maxId + i + 1,
				parentId: parent?.id,
				stockId: x.id,
				stock: x.stock,
				qty: 1,
				price: x.price,
				amount: x.price,
			};
		});

		const _data = [...(data ?? []), ...newItems];
		setData(_data);
	};

	const [openInventorySelection, setOpenInventorySelection] = useState(false);

	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);

	useEffect(() => {
		parent && getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 150 },
		{ field: "stockId", headerName: "Stock Id", width: 150 },
		{
			field: "stockName",
			headerName: "Stock Name",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.stockName,
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.description,
		},
		{
			field: "unit",
			headerName: "Unit",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.unit?.unit,
		},
		{
			field: "category",
			headerName: "Category",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.category?.category,
		},
		{
			field: "qty",
			headerName: "Qty",
			width: 100,
			headerAlign: "center",
			align: "center",
			type: "number",
			renderCell: (params: GridCellParams) => (
				<RenderCell
					data={data}
					setData={setData}
					params={params}
					fieldName="qty"
				/>
			),
		},
		{
			field: "price",
			headerName: "Price (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			type: "number",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
	];

	if (!parent) return <>[No parent data]</>;

	return (
		<>
			<Box textAlign="center">
				<b>{parent?.description}</b>
				<br />
				<p>{`For ${parent?.account?.profile?.name}`}</p>
				<small>{`Account # ${parent?.accountNo} | Date: ${FDate(
					parent?.docDate
				)}`}</small>
			</Box>

			{data ? (
				<>
					<h4>Account Order Items</h4>
					<small>As of {FDateTime(refresh)}</small>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							rows={data}
							columns={columns}
							pageSize={pageSize}
							onPageSizeChange={(params: GridPageChangeParams) =>
								setPageSize(params.pageSize)
							}
							rowsPerPageOptions={[5, 10, 20]}
							pagination
							autoHeight
							checkboxSelection
							disableSelectionOnClick
							selectionModel={selectionModel}
							onSelectionModelChange={(newSelection) =>
								setSelectionModel(newSelection.selectionModel)
							}
						/>
					</div>
					<InventorySelectDialog
						warehouseId={parent.warehouseId}
						date={parent.docDate}
						selectedIds={data.map((x) => x.stockId)}
						open={openInventorySelection}
						setOpen={setOpenInventorySelection}
						onSelectionConfirmed={handleAddItems}
					/>
					<PageCommands>
						<Button
							variant="contained"
							color="default"
							onClick={async () => {
								if (!isPrestine()) {
									const confirmed = await nc.confirmbox.show(
										"Some changes were not yet saved. Would you like to save these changes?"
									);
									if (confirmed) {
										saveList();
										return;
									}
								}

								backToView();
							}}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setOpenInventorySelection(true)}
						>
							Add Items
						</Button>

						<Button variant="contained" color="primary" onClick={saveList}>
							Save
						</Button>

						{selectionModel.length > 0 && (
							<Button
								variant="contained"
								color="secondary"
								onClick={removeSelectedItems}
							>
								Remove Selected Items
							</Button>
						)}
					</PageCommands>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Items;

interface IProps {
	data: AccountOrderItem[] | null;
	setData: React.Dispatch<React.SetStateAction<AccountOrderItem[] | null>>;
	params: GridCellParams;
	fieldName: "qty" | "price";
}

const RenderCell: FC<IProps> = ({ data, setData, params, fieldName }) => {
	if (data == null) return <>[No data]</>;

	if (fieldName === "qty")
		return (
			<TextField
				value={data.find((x) => x.id == params.id)?.qty}
				required
				type="number"
				variant="outlined"
				inputProps={{ style: { textAlign: "center" } }}
				onChange={(e) => {
					let ds = [...data];
					let d = ds.find((x) => x.id == params.id);
					if (d) {
						if (!isNaN(Number(e.target.value))) {
							const n = parseInt(e.target.value);
							if (n > 0) d.qty = n;
						}
						setData && setData([...ds]);
					}
				}}
			/>
		);
	else
		return (
			<AmountField
				value={data.find((x) => x.id == params.id)?.price ?? null}
				zeroIsAllowed={true}
				onFinalChange={(value) => {
					let ds = [...data];
					let d = ds.find((x) => x.id == params.id);
					if (d) {
						d.price = value;
						setData([...ds]);
					}
				}}
				tfProps={{
					required: true,
					variant: "outlined",
					inputProps: { style: { textAlign: "right" } },
				}}
			/>
		);
};

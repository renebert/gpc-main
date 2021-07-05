import { FC, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Box, Button } from "@material-ui/core";
import {
	Delivery,
	DeliveryItem,
	Stock,
} from "../../../../lib/models-inventory";
import { FDate, FDateTime } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridEditCellPropsParams,
	GridPageChangeParams,
	GridRowId,
	GridValueGetterParams,
} from "@material-ui/data-grid";

import Loading from "../../../../components/loading";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import PageCommands from "../../../../components/page-commands";
import { NotificationContext } from "../../../../lib/notifications";
import { RenderCell } from "../../../../components/render-fields";
import { StocksSelectDialog } from "../../../../components/data-select/stocks-select";

export interface IItemProps {
	refresh: Date;
	parent: Delivery;
}

const Items: FC<IItemProps> = ({ refresh, parent }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<DeliveryItem[] | null>(null);
	const [dataBak, setDataBak] = useState<DeliveryItem[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${g.API_URL}/inventory/delivery-items?parentId=${parent.id}`
		);
		if (res.success) {
			setData(res.data);
			setDataBak(JSON.parse(JSON.stringify(res.data)));
		}
	};

	const validate = () => {
		let errors: string[] = [];

		data?.forEach((x) => {
			if (x.stock == null) {
				errors.push(
					`Stock Id# ${x.stockId} does not exist anymore. It was probably deleted. Please remove the item.`
				);
			} else {
				if (x.qty <= 0)
					errors.push(
						`Stock Id# ${x.stockId} Qty is invalid. Please specify a value greater than 0`
					);
			}
		});

		return errors;
	};

	const saveList = async () => {
		const errors = validate();
		if (errors.length > 0) {
			nc.msgbox.show(errors, "Save items");
			return;
		}

		const res = await req.post(
			`${g.API_URL}/inventory/delivery-items/save?parentId=${parent.id}`,
			data
		);

		if (res.success) {
			nc.snackbar.show("Items were successfully saved");
			backToList();
		}
	};

	const isPrestine = () => JSON.stringify(data) == JSON.stringify(dataBak);

	const backToList = async () => {
		(
			ps.Get("deliveries-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const removeSelectedItems = () => {
		const newData =
			data?.filter((x) => !selectionModel.find((y) => y == x.id)) ?? null;

		setData(newData);
		setSelectionModel([]);
	};

	const handleAddItems = (value: Stock[]) => {
		const newItems: DeliveryItem[] = value.map((x, i) => {
			return {
				id: i * -1,
				parentId: parent.id,
				stockId: x.id,
				stock: x,
				qty: 0,
				price: 0,
			};
		});

		const _data = [...(data ?? []), ...newItems];
		setData(_data);
	};

	const [openStockSelection, setOpenStockSelection] = useState(false);

	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);

	useEffect(() => {
		getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "stockId", headerName: "Stock Id", width: 200 },
		{
			field: "stockName",
			headerName: "Stock Name",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "stock") as Stock)?.stockName,
		},
		{
			field: "unit",
			headerName: "Unit",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "stock") as Stock)?.unit?.unit,
		},
		{
			field: "category",
			headerName: "Category",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "stock") as Stock)?.category?.category,
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
			headerAlign: "center",
			align: "right",
			type: "number",
			renderCell: (params: GridCellParams) => (
				<RenderCell
					data={data}
					setData={setData}
					params={params}
					fieldName="price"
				/>
			),
		},
	];

	return (
		<>
			<Box textAlign="center">
				<b>{parent.description}</b>
				<br />
				<small>{`Date: ${FDate(parent.docDate)} | DR # ${parent.drNo} | PO # ${
					parent.poNo
				}`}</small>
			</Box>

			{data ? (
				<>
					<h4>Delivery Items</h4>
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
					<StocksSelectDialog
						selectedIds={data.map((x) => x.stockId)}
						open={openStockSelection}
						setOpen={setOpenStockSelection}
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

								backToList();
							}}
						>
							Back to Delivery list
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setOpenStockSelection(true)}
						>
							Add Items
						</Button>

						{!isPrestine() && (
							<Button variant="contained" color="primary" onClick={saveList}>
								Save
							</Button>
						)}

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

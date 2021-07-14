import { FC, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Box, Button } from "@material-ui/core";
import {
	PriceList,
	PriceListItem,
	Stock,
} from "../../../../lib/models-inventory";
import { FDate, FDateTime } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
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
import { AmountField } from "../../../../components/amount-field";
import { StocksSelectDialog } from "../../../../components/data-select/stocks-select";

export interface IItemProps {
	refresh: Date;
	parent: PriceList;
}

const Items: FC<IItemProps> = ({ refresh, parent }) => {
	const ps = useContext(PageStateContext);

	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<PriceListItem[] | null>(null);
	const [dataBak, setDataBak] = useState<PriceListItem[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${process.env.REACT_APP_API}/inventory/pricelist-items?parentId=${parent?.id}`
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
			} else if (x.price <= 0) {
				errors.push(
					`Stock Id# ${x.stockId} Price is invalid. Please specify a value greater than 0`
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
			`${process.env.REACT_APP_API}/inventory/pricelist-items/save?parentId=${parent?.id}`,
			data
		);

		if (res.success) {
			nc.snackbar.show("Items were successfully saved");
			backToView();
		}
	};

	const isPrestine = () => JSON.stringify(data) == JSON.stringify(dataBak);

	const backToView = () => {
		(
			ps.Get("pricelists-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: parent });
		(
			ps.Get("pricelists-setPageMode")?.dispatch as React.Dispatch<
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

	const handleAddItems = (value: Stock[]) => {
		//max data id
		let maxId = 0;
		const lst = data
			?.map((x) => x.id)
			.sort()
			.reverse();
		if (lst && lst.length > 0) maxId = lst[0];

		const newItems: PriceListItem[] = value.map((x, i) => {
			return {
				id: maxId + i + 1,
				parentId: parent?.id,
				stockId: x.id,
				stock: x,
				qty: 1,
				price: 0,
				pointValue: 0,
			};
		});

		const _data = [...(data ?? []), ...newItems];
		setData(_data);
	};

	const [openStockSelection, setOpenStockSelection] = useState(false);

	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);

	useEffect(() => {
		parent && getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "stockId", headerName: "Stock Id", width: 150 },
		{
			field: "stockName",
			headerName: "Stock Name",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "stock") as Stock)?.stockName,
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "stock") as Stock)?.description,
		},
		{
			field: "unit",
			headerName: "Unit",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "stock") as Stock)?.unit?.unit,
		},
		{
			field: "category",
			headerName: "Category",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "stock") as Stock)?.category?.category,
		},
		{
			field: "price",
			headerName: "Price (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			type: "number",
			renderCell: (params: GridCellParams) => (
				<RenderCell
					data={data}
					setData={setData}
					params={params}
					mode="price"
				/>
			),
		},
		{
			field: "pointValue",
			headerName: "Point Value",
			width: 150,
			headerAlign: "right",
			align: "right",
			type: "number",
			renderCell: (params: GridCellParams) => (
				<RenderCell
					data={data}
					setData={setData}
					params={params}
					mode="point-value"
				/>
			),
		},
	];

	return (
		<>
			<Box textAlign="center">
				<b>{parent?.description}</b>
				<br />
				<small>{`Date: ${FDate(parent?.docDate)}`}</small>
			</Box>

			{data ? (
				<>
					<h4>Price List Items</h4>
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

								backToView();
							}}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setOpenStockSelection(true)}
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
	data: PriceListItem[] | null;
	setData: React.Dispatch<React.SetStateAction<PriceListItem[] | null>>;
	params: GridCellParams;
	mode: "price" | "point-value";
}

const RenderCell: FC<IProps> = ({ data, setData, params, mode }) => {
	if (data == null) return <>[No data]</>;
	const value =
		(mode == "price"
			? data.find((x) => x.id == params.id)?.price
			: data.find((x) => x.id == params.id)?.pointValue) ?? null;

	return (
		<AmountField
			value={value}
			zeroIsAllowed={false}
			onFinalChange={(value) => {
				let ds = [...data];
				let d = ds.find((x) => x.id == params.id);
				if (d) {
					if (mode == "price") d.price = value;
					if (mode == "point-value") d.pointValue = value;
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

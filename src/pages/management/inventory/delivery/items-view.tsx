import { FC, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { DeliveryItem, Stock } from "../../../../lib/models-inventory";
import { FDateTime, FDouble } from "../../../../lib/common";
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";

import Loading from "../../../../components/loading";
import PageStateContext from "../../../../lib/pageStateContext";

export interface IItemProps {
	refresh: Date;
	parentId: number;
}

const ItemsView: FC<IItemProps> = ({ refresh, parentId }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();

	const [data, setData] = useState<DeliveryItem[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${g.API_URL}/inventory/delivery-items?parentId=${parentId}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

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

	return (
		<>
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
						/>
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default ItemsView;

import { FC, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { AccountOrderItem, Stock } from "../../../../lib/models-inventory";
import { FCurrency, FDateTime, FDouble } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";

import Loading from "../../../../components/loading";
import PageStateContext from "../../../../lib/pageStateContext";
import { Tooltip } from "@material-ui/core";
import { InlineList } from "../../../../components/styled";

export interface IItemProps {
	refresh: Date;
	parentId: number;
}

const ItemsView: FC<IItemProps> = ({ refresh, parentId }) => {
	const ps = useContext(PageStateContext);

	const req = useRequest();

	const [data, setData] = useState<AccountOrderItem[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${process.env.REACT_APP_API}/inventory/order-items?parentId=${parentId}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "stockId", headerName: "Stock Id", width: 150 },
		{
			field: "stockName",
			headerName: "Stock Name",
			width: 300,
			renderCell: (params: GridCellParams) => (
				<Tooltip title={params.row.stock?.description}>
					<div>{params.row.stock?.stockName}</div>
				</Tooltip>
			),
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
		{
			field: "discount",
			headerName: "Discount (₱)",
			width: 160,
			headerAlign: "right",
			align: "right",
			type: "number",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
		{
			field: "totalPointValue",
			headerName: "Point Value",
			width: 200,
			headerAlign: "right",
			align: "right",
			type: "number",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
		{
			field: "amount",
			headerName: "Amount (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			type: "number",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
	];

	let totalAmount = 0;
	let totalPointValue = 0;
	data?.forEach((x) => {
		totalPointValue += x.totalPointValue;
		totalAmount += x.amount;
	});

	return (
		<>
			{data ? (
				<>
					<h4>Account Order Items</h4>
					<small>As of {FDateTime(refresh)}</small>
					<div style={{ height: 400, width: "100%" }}>
						<InlineList align="right">
							<li>
								<h3>{`Total Point Value: ${FCurrency(totalPointValue)}`}</h3>
							</li>
							<li>
								<h3>&nbsp;|&nbsp;</h3>
							</li>
							<li>
								<h3>{`Total Amount: ${FCurrency(totalAmount)}`}</h3>
							</li>
						</InlineList>
						<DataGrid
							rows={data}
							columns={columns}
							hideFooterPagination={true}
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

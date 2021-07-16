import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridRowData,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";
import { FC, useEffect, useState } from "react";
import {
	FCurrency,
	FDate,
	FDateCustom,
	FDouble,
	Period,
} from "../../../lib/common";
import { useGlobal, useRequest } from "../../../lib/hooks";
import {
	AccountTransaction,
	AccountTransactionSet,
} from "../../../lib/models-account";
import Loading from "../../loading";
import { InlineList } from "../../styled";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	makeStyles,
	Tooltip,
} from "@material-ui/core";
import { AccountOrder, AccountOrderItem } from "../../../lib/models-inventory";

const useStyles = makeStyles((theme) => ({
	view: {
		float: "left",
	},
}));

type TransactionListViewType = "per order" | "per item";

interface IProps {
	data: AccountTransactionSet;
}

const Transactions: FC<IProps> = ({ data }) => {
	const classes = useStyles();

	const req = useRequest();

	const [view, setView] = useState<TransactionListViewType>("per order");

	const [rows, setRows] = useState<GridRowData[]>([]);
	const [cols, setCols] = useState<GridColDef[]>([]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "date",
			headerName: "Date",
			width: 110,
			valueGetter: (params: GridValueGetterParams) =>
				FDate((params.row as AccountTransaction).order.docDate),
		},
		{
			field: "orNo",
			headerName: "OR No.",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as AccountTransaction).order.orNo,
		},
		{
			field: "description",
			headerName: "Description",
			width: 250,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as AccountTransaction).order.description,
		},
		{
			field: "pointValue",
			headerName: "PV",
			width: 100,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value), 0),
		},
		{
			field: "amount",
			headerName: "Amount (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueGetter: (params: GridValueGetterParams) =>
				FDouble(Number((params.row as AccountTransaction).amount)),
		},
	];

	const columnsItemized: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "docDate",
			headerName: "Date",
			width: 110,
			valueGetter: (params: GridValueGetterParams) =>
				FDate(params.value as Date),
		},
		{
			field: "orNo",
			headerName: "OR No.",
			width: 150,
		},
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
			field: "qty",
			headerName: "Qty",
			width: 100,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "price",
			headerName: "Price (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueGetter: (params: GridValueGetterParams) =>
				FDouble(Number(params.value)),
		},
		{
			field: "discount",
			headerName: "Discount (₱)",
			width: 160,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
		{
			field: "totalPointValue",
			headerName: "PV",
			width: 100,
			headerAlign: "right",
			align: "right",
			type: "number",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value), 0),
		},
		{
			field: "amount",
			headerName: "Amount (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueGetter: (params: GridValueGetterParams) =>
				FDouble(Number(params.value)),
		},
	];

	const getItemized = (order: AccountOrder, items: AccountOrderItem[]) => {
		return items.map((x) => {
			return {
				docDate: order.docDate,
				orNo: order.orNo,
				...x,
			};
		});
	};

	useEffect(() => {
		if (view == "per order") {
			setRows(data.transactions ?? []);
			setCols(columns);
		} else {
			let lst: GridRowData[] = [];
			data?.transactions.forEach((x) => {
				lst = [...lst, ...getItemized(x.order, x.items)];
			});

			setRows(lst);
			setCols(columnsItemized);
		}
	}, [data, view]);

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			{data ? (
				<>
					<div className={classes.view}>
						<FormControl>
							<FormControlLabel
								control={
									<Checkbox
										checked={view == "per item"}
										onChange={(event, checked) =>
											setView(checked ? "per item" : "per order")
										}
										color="primary"
									/>
								}
								label="Itemized view"
							/>
						</FormControl>
					</div>
					<InlineList align="right">
						<li>
							<h3>{`PV: ${data.pointValue} | Orders: ${FCurrency(
								data.amount
							)}`}</h3>
						</li>
					</InlineList>
					<DataGrid
						rows={rows}
						columns={cols}
						pageSize={pageSize}
						onPageSizeChange={(params: GridPageChangeParams) =>
							setPageSize(params.pageSize)
						}
						rowsPerPageOptions={[5, 10, 20]}
						pagination
						autoHeight
					/>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Transactions;

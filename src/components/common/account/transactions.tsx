import {
	DataGrid,
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
	TransactionItem,
} from "../../../lib/models-account";
import Loading from "../../loading";
import { DateRangeSelectWidget } from "../../daterange-select";
import { InlineList } from "../../styled";
import {
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
} from "@material-ui/core";
import { AccountOrder, AccountOrderItem } from "../../../lib/models-inventory";

type TransactionListViewType = "per order" | "per item";

interface ITransactionListProps extends ITransactionProps {
	period: Period;
	view: TransactionListViewType;
}

const Transactions: FC<ITransactionListProps> = ({
	view,
	accountNo,
	period,
}) => {
	const req = useRequest();

	const [data, setData] = useState<AccountTransactionSet | null>(null);
	const [rows, setRows] = useState<GridRowData[]>([]);
	const [cols, setCols] = useState<GridColDef[]>([]);

	const getData = async () => {
		const res = await req.get(
			`${
				process.env.REACT_APP_API
			}/gpcaccount/transactions?accountNo=${accountNo}&startDate=${FDateCustom(
				period.startDate,
				"MM-DD-YYYY"
			)}&endDate=${FDateCustom(period.endDate, "MM-DD-YYYY")}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getData();
	}, [accountNo, period]);

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
			field: "amount",
			headerName: "Amount (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueGetter: (params: GridValueGetterParams) =>
				FDouble(Number((params.row as AccountTransaction).order.amount)),
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
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as TransactionItem).stock?.stockName,
		},
		{
			field: "qty",
			headerName: "Qty",
			width: 100,
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
			setRows(data?.transactions ?? []);
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
					<InlineList align="right">
						<li>
							<h3>{`Total Orders: ${FCurrency(data.amount)}`}</h3>
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

interface ITransactionProps {
	accountNo: string;
}

const TransactionsWidget: FC<ITransactionProps> = ({ accountNo }) => {
	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	}));
	const classes = useStyles();

	const [period, setPeriod] = useState<Period>(
		new Period(undefined, undefined, "month")
	);

	const [view, setView] = useState<TransactionListViewType>("per order");

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "docDate",
			headerName: "Date",
			width: 110,
			valueFormatter: (params: GridValueFormatterParams) =>
				FDate(new Date(params.value as Date)),
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
		},
		{
			field: "amount",
			headerName: "Amount (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
	];

	return (
		<>
			<InlineList>
				<li>
					<DateRangeSelectWidget
						title="Select Period"
						period={period}
						onSelectionConfirmed={(value) => setPeriod(value)}
					/>
				</li>
				<li>
					<FormControl className={classes.formControl}>
						<InputLabel>Select View</InputLabel>
						<Select
							value={view}
							onChange={(e) =>
								setView(e.target.value as TransactionListViewType)
							}
						>
							<MenuItem value="per order">Per Order</MenuItem>
							<MenuItem value="per item">Per Item</MenuItem>
						</Select>
					</FormControl>
				</li>
			</InlineList>
			<Transactions accountNo={accountNo} period={period} view={view} />
		</>
	);
};

export default TransactionsWidget;

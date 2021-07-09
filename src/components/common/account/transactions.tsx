import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";
import { FC, useEffect, useState } from "react";
import {
	FDate,
	FDateCustom,
	FDateTime,
	FDouble,
	Period,
} from "../../../lib/common";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { AccountTransaction } from "../../../lib/models-transactions";
import Loading from "../../loading";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import { DateRangeSelectWidget } from "../../daterange-select";
import { AccountOrder } from "../../../lib/models-inventory";

interface ITransactionListProps extends ITransactionProps {
	period: Period;
}

const TransactionList: FC<ITransactionListProps> = ({ accountNo, period }) => {
	const g = useGlobal();
	const req = useRequest();

	const [data, setData] = useState<AccountTransaction[] | null>(null);

	const getData = async () => {
		const res = await req.get(
			`${
				g.API_URL
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

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			{data ? (
				<>
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

const Transactions: FC<ITransactionProps> = ({ accountNo }) => {
	const [period, setPeriod] = useState<Period>(new Period());

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
			<div>
				<b>Period</b>
			</div>
			<DateRangeSelectWidget
				title="Select Period"
				period={new Period(undefined, undefined, "month")}
				onSelectionConfirmed={(value) => setPeriod(value)}
			/>
			<br />
			<br />
			<TransactionList accountNo={accountNo} period={period} />
		</>
	);
};

export default Transactions;

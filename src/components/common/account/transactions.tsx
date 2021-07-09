import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
} from "@material-ui/data-grid";
import { FC, useEffect, useState } from "react";
import { FDate, FDateCustom, FDateTime, FDouble } from "../../../lib/common";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { AccountTransaction } from "../../../lib/models-transactions";
import Loading from "../../loading";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";

interface IProps {
	accountNo: string;
}

const Transactions: FC<IProps> = ({ accountNo }) => {
	const g = useGlobal();
	const req = useRequest();

	const dt = new Date();

	const [data, setData] = useState<AccountTransaction[] | null>(null);
	const [startDate, setStartDate] = useState<Date>(new Date("1/1/2021"));
	const [endDate, setEndDate] = useState<Date>(new Date("12/31/2021"));
	const [open, setOpen] = useState(false);
	const [dateRange, setDateRange] = useState<DateRange>({});

	const getData = async () => {
		const res = await req.get(
			`${
				g.API_URL
			}/gpcaccount/transactions?accountNo=${accountNo}&startDate=${FDateCustom(
				startDate,
				"MM-DD-YYYY"
			)}&endDate=${FDateCustom(endDate, "MM-DD-YYYY")}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getData();
	}, [accountNo, startDate, endDate]);

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

	const toggle = () => setOpen(!open);

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			<DateRangePicker
				open={open}
				toggle={toggle}
				onChange={(range) => setDateRange(range)}
			/>
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

export default Transactions;

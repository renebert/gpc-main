import { Divider, TextField } from "@material-ui/core";
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
} from "@material-ui/data-grid";
import { FC, useContext, useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import { FDateCustom, FDouble } from "../../../../lib/common";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Inventory } from "../../../../lib/models-inventory";

interface IProps {
	warehouseId: number;
}

const Report: FC<IProps> = ({ warehouseId }) => {
	const g = useGlobal();
	const req = useRequest();
	const [date, setDate] = useState(new Date());
	const [data, setData] = useState<Inventory[] | null>(null);

	const getData = async () => {
		const res = await req.get(
			`${
				g.API_URL
			}/inventory/report?warehouseId=${warehouseId}&date=${FDateCustom(
				date,
				"MM-DD-YYYY"
			)}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getData();
	}, [warehouseId, date]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Stock Id", width: 150 },
		{
			field: "stockName",
			headerName: "Stock Name",
			width: 300,
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
		},
		{
			field: "unit",
			headerName: "Unit",
			width: 150,
		},
		{
			field: "category",
			headerName: "Category",
			width: 150,
		},
		{
			field: "qty",
			headerName: "Qty",
			type: "number",
			width: 150,
		},
		{
			field: "price",
			headerName: "Price",
			type: "number",
			width: 150,
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
	];

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			<TextField
				type="date"
				label="As of"
				value={FDateCustom(date, "YYYY-MM-DD")}
				onChange={(e) => setDate(new Date(e.target.value))}
			/>
			<br />
			<br />
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

export default Report;
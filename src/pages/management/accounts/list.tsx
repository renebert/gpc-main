import { FC, useContext, useEffect, useState } from "react";
import { RequestType, useGlobal, useRequest } from "../../../lib/hooks";
import { Button } from "@material-ui/core";
import { GPCAccount, Profile, QuickProfile } from "../../../lib/models";
import { FDateTime } from "../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";

import Loading from "../../../components/loading";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PageviewIcon from "@material-ui/icons/Pageview";

interface IProps {
	refresh: Date;
}

const List: FC<IProps> = ({ refresh }) => {
	const ps = useContext(PageStateContext);

	const req = useRequest();

	const [data, setData] = useState<GPCAccount[] | null>(null);

	const getList = async () => {
		const res = await req.get(`${process.env.REACT_APP_API}/gpcaccount/list`);
		if (res.success) {
			setData(res.data);
		}
	};

	const open = (openData: GPCAccount, mode: PageModeType) => {
		(
			ps.Get("management-accounts-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: openData });

		(
			ps.Get("management-accounts-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)(mode);
	};

	useEffect(() => {
		getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "name",
			headerName: "Name",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as GPCAccount).profile.name,
		},
		{
			field: "accountNo",
			headerName: "Account No.",
			width: 170,
		},
		{
			field: "upline",
			headerName: "Upline",
			width: 300,
			valueGetter: (params: GridValueGetterParams) => {
				const account = params.row as GPCAccount;
				return account.upline ? account.upline.profile.name : "[No upline]";
			},
		},
		{
			field: "",
			filterable: false,
			sortable: false,
			disableColumnMenu: true,
			flex: 0.3,
			cellClassName: "row-commands",
			renderCell: (params: GridCellParams) => (
				<>
					<Tooltip title="View">
						<IconButton
							onClick={() => open(params.row as GPCAccount, "view")}
							size="small"
						>
							<PageviewIcon />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			{data ? (
				<>
					<h4>Account List</h4>
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

export default List;

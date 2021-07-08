import { FC, useContext, useEffect, useState } from "react";
import { RequestType, useGlobal, useRequest } from "../../../../lib/hooks";
import { Button } from "@material-ui/core";
import { FDate, FDateTime } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";

import Loading from "../../../../components/loading";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import PageCommands from "../../../../components/page-commands";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import {
	Notification,
	NotificationContext,
} from "../../../../lib/notifications";
import { Global } from "../../../../lib/global";
import { GPCAccountRequest, Profile } from "../../../../lib/models";

interface IProps {
	refresh: Date;
}

const List: FC<IProps> = ({ refresh }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<GPCAccountRequest[] | null>(null);

	const getList = async () => {
		const res = await req.get(`${g.API_URL}/gpcaccount-request/submitted-list`);
		if (res.success) {
			setData(res.data);
		}
	};

	const open = (openData: GPCAccountRequest, mode: PageModeType) => {
		(
			ps.Get("onlineApplications-account-request-setOpenProps")
				?.dispatch as React.Dispatch<React.SetStateAction<object>>
		)({ dataRequest: openData });

		(
			ps.Get("onlineApplications-account-request-setPageMode")
				?.dispatch as React.Dispatch<React.SetStateAction<PageModeType>>
		)(mode);
	};

	useEffect(() => {
		getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "name",
			headerName: "Requested by",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as GPCAccountRequest).profile.name,
		},
		{
			field: "dateSubmitted",
			headerName: "Date Submitted",
			width: 200,
			valueFormatter: (params: GridValueFormatterParams) =>
				FDate(new Date(params.value as Date)),
		},
		{
			field: "statusDesc",
			headerName: "Status",
			width: 200,
		},
		{
			field: "statusBy_Name",
			headerName: "Remarks",
			width: 300,
			renderCell: (params: GridCellParams) => {
				const request = params.row as GPCAccountRequest;
				return (
					<>
						{request.isPending ? (
							"Pending action from management"
						) : (
							<>
								{request.statusBy_Name}&nbsp;|&nbsp;
								<small>{FDateTime(new Date(request.statusDate))}</small>
							</>
						)}
					</>
				);
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
							onClick={() => open(params.row as GPCAccountRequest, "view")}
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
					<h4>Account Requests</h4>
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

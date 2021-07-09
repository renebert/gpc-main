import { FC, useContext, useEffect, useState } from "react";
import { RequestType, useGlobal, useRequest } from "../../../lib/hooks";
import { Button } from "@material-ui/core";
import { Profile } from "../../../lib/models";
import { FDateTime } from "../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
} from "@material-ui/data-grid";

import Loading from "../../../components/loading";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import PageCommands from "../../../components/page-commands";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import { Notification, NotificationContext } from "../../../lib/notifications";
import { Global } from "../../../lib/global";

interface IProps {
	refresh: Date;
}

const List: FC<IProps> = ({ refresh }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<Profile[] | null>(null);

	const getList = async () => {
		const res = await req.get(`${g.API_URL}/profile/list`);
		if (res.success) {
			setData(res.data);
		}
	};

	const open = (openData: Profile, mode: PageModeType) => {
		(
			ps.Get("management-profiles-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: openData });

		(
			ps.Get("management-profiles-setPageMode")?.dispatch as React.Dispatch<
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
			field: "fullname",
			headerName: "Name",
			width: 300,
		},
		{
			field: "nickName",
			headerName: "Name",
			width: 150,
		},
		{
			field: "genderStr",
			headerName: "Gender",
			width: 150,
		},
		{
			field: "civilStatusStr",
			headerName: "Civil Status",
			width: 150,
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
							onClick={() => open(params.row as Profile, "view")}
							size="small"
						>
							<PageviewIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Edit">
						<IconButton
							onClick={() => open(params.row as Profile, "edit")}
							size="small"
						>
							<EditIcon />
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
					<h4>Profile List</h4>
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

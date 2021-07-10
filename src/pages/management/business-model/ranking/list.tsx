import { FC, useContext, useEffect, useState } from "react";
import { RequestType, useGlobal, useRequest } from "../../../../lib/hooks";
import { Button } from "@material-ui/core";
import { Ranking } from "../../../../lib/models-bm";
import { FDateTime } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
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

interface IProps {
	refresh: Date;
}

export const deleteRecord = async (
	id: number,
	g: Global,
	req: RequestType,
	nc: Notification,
	callback: () => void
) => {
	const confirmed = await nc.confirmbox.show(
		"Are you sure you want to delete this record?"
	);
	if (confirmed) {
		const res = await req.post(
			`${process.env.REACT_APP_API}/business-model/ranking/delete?id=${id}`
		);
		if (res.success) {
			nc.snackbar.show("Record was successfully deleted");
			callback();
		}
	}
};

const List: FC<IProps> = ({ refresh }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<Ranking[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${process.env.REACT_APP_API}/business-model/ranking/list`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	const create = () => {
		(
			ps.Get("rankings-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("create");
	};

	const open = (openData: Ranking, mode: PageModeType) => {
		(
			ps.Get("rankings-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: openData });

		(
			ps.Get("rankings-setPageMode")?.dispatch as React.Dispatch<
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
			field: "description",
			headerName: "Description",
			width: 300,
		},
		{ field: "dlThreshold", headerName: "Downlines Threshold", width: 250 },
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
							onClick={() => open(params.row as Ranking, "view")}
							size="small"
						>
							<PageviewIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Edit">
						<IconButton
							onClick={() => open(params.row as Ranking, "edit")}
							size="small"
						>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton
							onClick={() =>
								deleteRecord(params.id as number, g, req, nc, getList)
							}
							size="small"
						>
							<DeleteIcon />
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
					<h4>Ranking List</h4>
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
					<PageCommands>
						<Button variant="contained" color="primary" onClick={create}>
							Create
						</Button>
					</PageCommands>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default List;

import { FC, useContext, useEffect, useState } from "react";
import { RequestType, useGlobal, useRequest } from "../../../../lib/hooks";
import { Box, Button } from "@material-ui/core";
import { Delivery } from "../../../../lib/models-inventory";
import { FDate, FDateTime, FDouble } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CheckIcon from "@material-ui/icons/Check";
import DraftsIcon from "@material-ui/icons/Drafts";
import {
	Notification,
	NotificationContext,
} from "../../../../lib/notifications";
import { QuickProfile } from "../../../../lib/models";
import { Global } from "../../../../lib/global";
import { ConfirmedBadge, StyledBadge } from "../../../../components/styled";

interface IProps {
	refresh: Date;
	warehouseId: number;
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
			`${g.API_URL}/inventory/delivery/delete?id=${id}`
		);
		if (res.success) {
			nc.snackbar.show("Record was successfully deleted");
			callback();
		}
	}
};

const dummyButton = (
	<IconButton size="small" disabled>
		<PageviewIcon style={{ visibility: "hidden" }} />
	</IconButton>
);

const List: FC<IProps> = ({ refresh, warehouseId }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<Delivery[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${g.API_URL}/inventory/delivery/list?warehouseId=${warehouseId}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	const create = () => {
		(
			ps.Get("deliveries-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("create");
	};

	const open = (openData: Delivery, mode: PageModeType) => {
		(
			ps.Get("deliveries-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: openData });

		(
			ps.Get("deliveries-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)(mode);
	};

	const openItems = (openData: Delivery, mode: PageModeType) => {
		(
			ps.Get("deliveries-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ refresh: new Date(), parent: openData });

		(
			ps.Get("deliveries-setPageMode")?.dispatch as React.Dispatch<
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
			field: "poNo",
			headerName: "PO No.",
			width: 130,
		},
		{
			field: "drNo",
			headerName: "DR No.",
			width: 130,
		},
		{
			field: "supplier",
			headerName: "Supplier",
			width: 200,
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
		{
			field: "confirmed",
			headerName: "Status",
			width: 150,
			headerAlign: "center",
			align: "center",
			renderCell: (params: GridCellParams) => {
				let tt = "Unconfirmed";

				const isConfirmed = params.getValue(
					params.id,
					"isConfirmed"
				) as boolean;
				if (isConfirmed) {
					const confirmedBy = params.getValue(
						params.id,
						"confirmedBy"
					) as QuickProfile;

					tt = `Confirmed by ${confirmedBy.name}`;
				}

				return (
					<>
						{isConfirmed ? (
							<Box color="green">
								<Tooltip title={tt}>
									<ConfirmedBadge
										badgeContent={params.getValue(params.id, "itemCount")}
									>
										<CheckIcon />
									</ConfirmedBadge>
								</Tooltip>
							</Box>
						) : (
							<Box color="lightgray">
								<Tooltip title="Draft">
									<DraftsIcon />
								</Tooltip>
							</Box>
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
			renderCell: (params: GridCellParams) => {
				const confirmed = (params.row as Delivery).isConfirmed;
				return (
					<>
						{confirmed ? (
							<>
								{dummyButton}
								<Tooltip title="View">
									<IconButton
										onClick={() => open(params.row as Delivery, "view")}
										size="small"
									>
										<PageviewIcon />
									</IconButton>
								</Tooltip>
								{dummyButton}
								{dummyButton}
								{dummyButton}
							</>
						) : (
							<>
								<Tooltip title="Update Items">
									<IconButton
										onClick={() =>
											openItems(params.row as Delivery, "view-items")
										}
										size="small"
									>
										<StyledBadge
											badgeContent={params.getValue(params.id, "itemCount")}
										>
											<MoreHorizIcon />
										</StyledBadge>
									</IconButton>
								</Tooltip>
								<Tooltip title="View">
									<IconButton
										onClick={() => open(params.row as Delivery, "view")}
										size="small"
									>
										<PageviewIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="Edit">
									<IconButton
										onClick={() => open(params.row as Delivery, "edit")}
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
						)}
					</>
				);
			},
		},
	];

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			{data ? (
				<>
					<h4>Delivery List</h4>
					<small>As of {FDateTime(refresh)}</small>
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

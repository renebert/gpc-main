import { FC, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Badge, Box, Button, Popover } from "@material-ui/core";
import { Delivery } from "../../../../lib/models-inventory";
import { FCurrency, FDate, FDateTime, FDouble } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	trTR,
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
import ScheduleIcon from "@material-ui/icons/Schedule";
import { NotificationContext } from "../../../../lib/notifications";
import {
	Theme,
	withStyles,
	createStyles,
	makeStyles,
} from "@material-ui/core/styles";
import { QuickProfile } from "../../../../lib/models";

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: "0 4px",
			backgroundColor: "green",
			color: "white",
		},
	})
)(Badge);

interface IProps {
	refresh: Date;
	warehouseId: number;
}

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

	const deleteRecord = async (id: number) => {
		const confirmed = await nc.confirmbox.show(
			"Are you sure you want to delete this record?"
		);
		if (confirmed) {
			const res = await req.post(
				`${g.API_URL}/inventory/delivery/delete?id=${id}`
			);
			if (res.success) {
				nc.snackbar.show("Record was successfully deleted");
				getList();
			}
		}
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
			headerAlign: "center",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
		},
		{
			field: "confirmed",
			headerName: "Confirmed",
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
									<CheckIcon />
								</Tooltip>
							</Box>
						) : (
							<Box color="orange">
								<Tooltip title="Pending">
									<ScheduleIcon />
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
			renderCell: (params: GridCellParams) => (
				<>
					<Tooltip title="View Items">
						<IconButton
							onClick={() => openItems(params.row as Delivery, "view-items")}
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
							onClick={() => deleteRecord(params.id as number)}
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

import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	TextField,
} from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../../components/page-commands";
import { AccountOrder } from "../../../../lib/models-inventory";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FCurrency, FDate, FDateTime } from "../../../../lib/common";
import ItemsView from "./items-view";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { NotificationContext } from "../../../../lib/notifications";
import { deleteRecord } from "./list";
import ConfirmedImage from "../../../../assets/confirmed.png";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: "relative",
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			color: theme.palette.text.secondary,
			minHeight: 400,
		},
		confirmed: {
			width: 300,
			position: "absolute",
			top: 50,
			right: 50,
			opaity: 0.1,
		},
	})
);

interface IProps {
	data?: AccountOrder;
}

const View: FC<IProps> = ({ data }) => {
	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const ps = useContext(PageStateContext);

	if (!data) return <div>No data provided</div>;

	const backToList = () => {
		(
			ps.Get("accountOrders-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const edit = () => {
		(
			ps.Get("accountOrders-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data, caller: "view" });

		(
			ps.Get("accountOrders-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("edit");
	};

	const updateItems = () => {
		(
			ps.Get("accountOrders-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ refresh: new Date(), parent: data });

		(
			ps.Get("accountOrders-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("view-items");
	};

	const create = () => {
		const d = new AccountOrder();
		d.warehouseId = data.warehouseId;

		(
			ps.Get("accountOrders-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: d });

		(
			ps.Get("accountOrders-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("create");
	};

	const confirm = async () => {
		const confirmed = await nc.confirmbox.show(
			"Are you sure you want to confirm this document?"
		);
		if (!confirmed) return;

		nc.processing.show();
		let res = await req.post(
			`${g.API_URL}/inventory/order/confirm?id=${data.id}&profileId=${g.Profile.id}`
		);
		if (res.success) {
			nc.snackbar.show("Document was successfully confirmed");
			backToList();
		}
		nc.processing.hide();
	};

	return (
		<>
			<h4>View Account Order</h4>
			<div className={classes.root}>
				{data.isConfirmed && (
					<img src={ConfirmedImage} className={classes.confirmed} />
				)}

				<Paper className={classes.paper}>
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Id:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<TextField value={data.id} disabled />
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Date:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<TextField value={FDate(data.docDate)} disabled />
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Description:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<TextField value={data.description} disabled />
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Account Name:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<TextField value={data.account?.profile?.name} disabled />
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Account No.:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<TextField value={data.accountNo} disabled />
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Amount:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<TextField value={FCurrency(data.amount)} disabled />
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Remarks:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<p>{data.remarks}</p>
						</Grid>
					</Grid>
					{data.isConfirmed && (
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Confirmed by:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<TextField value={data.confirmedBy?.name} disabled />
								<div>
									<small>{FDateTime(data.dateConfirmed)}</small>
								</div>
							</Grid>
						</Grid>
					)}

					<Divider />
					{data && <ItemsView refresh={new Date()} parentId={data.id} />}
				</Paper>
			</div>
			<PageCommands>
				<Button variant="contained" color="default" onClick={backToList}>
					Back to list
				</Button>
				{data.itemCount > 0 && !data.isConfirmed && (
					<Button variant="contained" color="primary" onClick={confirm}>
						Confirm
					</Button>
				)}

				{!data.isConfirmed && (
					<>
						<Button variant="contained" color="primary" onClick={updateItems}>
							Update Items
						</Button>
						<Button variant="contained" color="primary" onClick={edit}>
							Edit
						</Button>
						<Button variant="contained" color="primary" onClick={create}>
							Create
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => deleteRecord(data.id, g, req, nc, backToList)}
						>
							Delete
						</Button>
					</>
				)}
			</PageCommands>
		</>
	);
};

export default View;

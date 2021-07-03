import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../../components/page-commands";
import { Warehouse } from "../../../../lib/models-inventory";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			color: theme.palette.text.secondary,
			minHeight: 400,
		},
	})
);

interface IProps {
	data?: Warehouse;
}

const View: FC<IProps> = ({ data }) => {
	const classes = useStyles();
	const ps = useContext(PageStateContext);

	if (!data) return <div>No data provided</div>;

	const backToList = () => {
		(
			ps.Get("warehouses-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const edit = () => {
		(
			ps.Get("warehouses-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data, caller: "view" });

		(
			ps.Get("warehouses-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("edit");
	};

	return (
		<>
			<h4>View Warehouse</h4>
			<div className={classes.root}>
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
								Warehouse:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<TextField value={data.warehouse} disabled />
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
				</Paper>
			</div>
			<PageCommands>
				<Button variant="contained" color="default" onClick={backToList}>
					Back to list
				</Button>
				<Button variant="contained" color="primary" onClick={edit}>
					Edit
				</Button>
			</PageCommands>
		</>
	);
};

export default View;

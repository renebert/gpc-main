import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../../components/page-commands";
import { Ranking } from "../../../../lib/models-bm";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import { deleteRecord } from "./list";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { NotificationContext } from "../../../../lib/notifications";
import { StyledViewField, StyledViewPage } from "../../../../components/styled";

interface IProps {
	data?: Ranking;
}

const View: FC<IProps> = ({ data }) => {
	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const ps = useContext(PageStateContext);

	if (!data) return <div>No data provided</div>;

	const backToList = () => {
		(
			ps.Get("rankings-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const edit = () => {
		(
			ps.Get("rankings-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });

		(
			ps.Get("rankings-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("edit");
	};

	const create = () => {
		const d = new Ranking();

		(
			ps.Get("rankings-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: d });

		(
			ps.Get("rankings-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("create");
	};

	return (
		<>
			<h4>View Ranking</h4>

			<StyledViewPage>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Id:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.id}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Description:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.description}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Downlines Threshold:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.dlThreshold}</StyledViewField>
					</Grid>
				</Grid>
			</StyledViewPage>

			<PageCommands>
				<Button variant="contained" color="default" onClick={backToList}>
					Back to list
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
			</PageCommands>
		</>
	);
};

export default View;

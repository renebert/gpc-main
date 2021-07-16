import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../../components/page-commands";
import { Rank } from "../../../../lib/models-bm";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { NotificationContext } from "../../../../lib/notifications";
import { StyledViewField, StyledViewPage } from "../../../../components/styled";

interface IProps {
	data?: Rank;
}

const View: FC<IProps> = ({ data }) => {
	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const ps = useContext(PageStateContext);

	if (!data) return <div>No data provided</div>;

	const backToList = () => {
		(
			ps.Get("rank-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const edit = () => {
		(
			ps.Get("rank-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });

		(
			ps.Get("rank-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("edit");
	};

	return (
		<>
			<h4>View Rank</h4>

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
							Code:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.code}</StyledViewField>
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
							Required Downlines:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.dlRequired}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Downline Rank:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.dlRank}</StyledViewField>
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
			</PageCommands>
		</>
	);
};

export default View;

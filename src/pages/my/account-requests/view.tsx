import { Box, Button, Grid } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../components/page-commands";
import { GPCAccountRequest } from "../../../lib/models";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import { deleteRecord } from "./list";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { NotificationContext } from "../../../lib/notifications";
import { StyledViewField, StyledViewPage } from "../../../components/styled";
import { FDate, FDateTime } from "../../../lib/common";

interface IProps {
	data?: GPCAccountRequest;
}

const View: FC<IProps> = ({ data }) => {
	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const ps = useContext(PageStateContext);

	if (!data) return <div>No data provided</div>;

	const backToList = () => {
		(
			ps.Get("account-requests-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	return (
		<>
			<h4>View Account Request</h4>

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
							Date Submitted:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{FDate(data.dateSubmitted)}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Status:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>
							<div>{data.statusDesc}</div>
						</StyledViewField>
					</Grid>
				</Grid>
				{data.isDenied && data.denyMessage && (
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Deny Message:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<StyledViewField>
								<div>{data.denyMessage}</div>
							</StyledViewField>
						</Grid>
					</Grid>
				)}
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							By:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>
							{data.isPending ? (
								"Pending action from management"
							) : (
								<>
									<div>{data.statusBy_Name}</div>
									<small>{FDateTime(new Date(data.statusDate))}</small>
								</>
							)}
						</StyledViewField>
					</Grid>
				</Grid>
			</StyledViewPage>

			<PageCommands>
				<Button variant="contained" color="default" onClick={backToList}>
					Back to list
				</Button>
				{data.isDenied && (
					<Button
						variant="contained"
						color="secondary"
						onClick={() => deleteRecord(data.id, g, req, nc, backToList)}
					>
						Delete
					</Button>
				)}
			</PageCommands>
		</>
	);
};

export default View;

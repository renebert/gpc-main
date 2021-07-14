import { Box, Button, Divider, Grid } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../components/page-commands";
import { UplineClaim } from "../../../lib/models";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import { useGlobal } from "../../../lib/hooks";
import { StyledViewField, StyledViewPage } from "../../../components/styled";
import { FDateTime } from "../../../lib/common";

interface IProps {
	data?: UplineClaim;
}

const View: FC<IProps> = ({ data }) => {
	const g = useGlobal();

	const ps = useContext(PageStateContext);

	const edit = () => {
		(
			ps.Get("uplineclaim-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });

		(
			ps.Get("uplineclaim-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("edit");
	};

	if (!data) return <div>No data found</div>;

	return (
		<>
			<h4>View Upline Claim</h4>

			<StyledViewPage>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Created:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{FDateTime(data.dateCreated)}</StyledViewField>
					</Grid>
				</Grid>
				{data.lastUpdated && (
					<Grid container spacing={3}>
						<Grid item sm={2}>
							<Box textAlign="right" fontWeight="bold">
								Last Updated:
							</Box>
						</Grid>
						<Grid item sm={10}>
							<StyledViewField>{FDateTime(data.lastUpdated)}</StyledViewField>
						</Grid>
					</Grid>
				)}
				<Divider />
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Last Name:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.lastName}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							First Name:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.firstName}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Nickname:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.nickName}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Email:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.email}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Account No.:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.accountNo}</StyledViewField>
					</Grid>
				</Grid>
			</StyledViewPage>

			{!g.HasGPCAccount && (
				<PageCommands>
					<Button variant="contained" color="primary" onClick={edit}>
						Edit
					</Button>
				</PageCommands>
			)}
		</>
	);
};

export default View;

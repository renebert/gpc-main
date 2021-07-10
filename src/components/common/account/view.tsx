import { Box, Divider, Grid, Tab } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import { FC } from "react";
import { GPCAccount } from "../../../lib/models";
import { StyledViewField, StyledViewPage } from "../../styled";
import NTabs from "../../tabs";
import Transactions from "./transactions";

interface IProps {
	data?: GPCAccount;
}

const View: FC<IProps> = ({ data }) => {
	return (
		<>
			<StyledViewPage>
				{data ? (
					<>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Name:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.profile.name}</StyledViewField>
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
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Upline:
								</Box>
							</Grid>
							<Grid item sm={10}>
								{data.upline ? (
									<>
										<StyledViewField>{data.upline?.name}</StyledViewField>
										<small>{data.uplineAccountNo}</small>
									</>
								) : (
									<StyledViewField>[No upline]</StyledViewField>
								)}
							</Grid>
						</Grid>

						<Divider />
						<NTabs
							tabHeaders={["Transactions", "Downlines"]}
							tabs={[
								<Transactions accountNo={data.accountNo} />,
								<>Downlines goes here...</>,
							]}
						/>
					</>
				) : (
					<div>[No data]</div>
				)}
			</StyledViewPage>
		</>
	);
};

export default View;

import { Box, Divider, Grid } from "@material-ui/core";
import { FC } from "react";
import { GPCAccount } from "../../../lib/models";
import { StyledViewField, StyledViewPage } from "../../styled";
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
								<StyledViewField>{data.upline?.name}</StyledViewField>
								<small>{data.uplineAccountNo}</small>
							</Grid>
						</Grid>

						<Divider />
						<Transactions accountNo={data.accountNo} />
					</>
				) : (
					<div>[No data]</div>
				)}
			</StyledViewPage>
		</>
	);
};

export default View;

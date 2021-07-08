import { Box, Grid } from "@material-ui/core";
import { FC } from "react";
import { GPCAccount } from "../../../lib/models";
import { StyledViewField, StyledViewPage } from "../../../components/styled";
import Loading from "../../../components/loading";

interface IProps {
	data?: GPCAccount;
}

const View: FC<IProps> = ({ data }) => {
	if (data) {
		const comp1 = JSON.stringify(data);
		const comp2 = JSON.stringify(new GPCAccount());

		if (comp1 == comp2) {
			return (
				<>
					<h3>
						You have no account yet, please make a request to create an account
						for you and wait for the approval of your request
					</h3>
					<p>
						(Click on "Account Requests" link above to view or create a request)
					</p>
				</>
			);
		}
	}

	return (
		<>
			{data ? (
				<>
					<h4>View Account</h4>

					<StyledViewPage>
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
					</StyledViewPage>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default View;

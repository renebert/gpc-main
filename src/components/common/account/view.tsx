import { Box, Divider, Grid } from "@material-ui/core";
import { FC, useContext } from "react";
import { GPCAccount } from "../../../lib/models";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import {
	StyledViewField,
	StyledViewPage,
	useClickableStyle,
} from "../../styled";
import AccountModelWidget from "./accountmodel";

interface IProps {
	data?: GPCAccount;
}

const View: FC<IProps> = ({ data }) => {
	const classes = useClickableStyle();
	const ps = useContext(PageStateContext);

	const open = (openData: GPCAccount) => {
		(
			ps.Get("management-accounts-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: openData });

		(
			ps.Get("management-accounts-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("view");
	};

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
									Rank:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.rank.description}</StyledViewField>
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
									<div
										className={classes.root}
										onClick={() => data.upline && open(data.upline)}
									>
										<StyledViewField>
											{data.upline?.profile.name}
										</StyledViewField>
										<small>{data.uplineAccountNo}</small>
									</div>
								) : (
									<StyledViewField>[No upline]</StyledViewField>
								)}
							</Grid>
						</Grid>

						<Divider />
						<AccountModelWidget
							accountNo={data.accountNo}
							onSelectAccount={(account) => open(account)}
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

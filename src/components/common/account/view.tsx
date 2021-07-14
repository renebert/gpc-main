import { Box, Divider, Grid, makeStyles, Tab } from "@material-ui/core";
import { FC, useContext, useEffect, useState } from "react";
import { getAccountModel } from "../../../lib/common";
import { useRequest } from "../../../lib/hooks";
import { GPCAccount } from "../../../lib/models";
import {
	AccountModel,
	DefaultAccountModelParams,
} from "../../../lib/models-account";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import {
	StyledViewField,
	StyledViewPage,
	useClickableStyle,
} from "../../styled";
import NTabs from "../../tabs";
import DownlinesWidget from "./downlines";
import TransactionsWidget from "./transactions";

interface IProps {
	data?: GPCAccount;
}

const View: FC<IProps> = ({ data }) => {
	const classes = useClickableStyle();
	const req = useRequest();
	const ps = useContext(PageStateContext);

	const [accountModel, setAccountModel] = useState<AccountModel | undefined>();

	const getAccount = async (profileId: number) => {
		const res = await req.get(
			`${process.env.REACT_APP_API}/gpcaccount?profileId=${profileId}`
		);
		if (res.success) return res.data;
		else return null;
	};

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

	const getAcctModel = async () => {
		let p = new DefaultAccountModelParams();
		p.accountNo = data?.accountNo ?? "";
		p.noDownlines = false;
		p.downlineLevelLimit = 1;

		const res = await getAccountModel(p);

		if (res.success) {
			setAccountModel(res.data);
		}
	};

	useEffect(() => {
		getAcctModel();
	}, [data]);

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
								<StyledViewField>
									{accountModel?.rank.description}
								</StyledViewField>
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
										onClick={async () => {
											const account = await getAccount(data.upline?.id ?? 0);
											open(account);
										}}
									>
										<StyledViewField>{data.upline?.name}</StyledViewField>
										<small>{data.uplineAccountNo}</small>
									</div>
								) : (
									<StyledViewField>[No upline]</StyledViewField>
								)}
							</Grid>
						</Grid>

						<Divider />
						<NTabs
							tabHeaders={["Transactions", "Downlines"]}
							tabs={[
								<TransactionsWidget accountNo={data.accountNo} />,
								<DownlinesWidget
									accountNo={data.accountNo}
									refresh={new Date()}
									onSelect={(account) => open(account)}
								/>,
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

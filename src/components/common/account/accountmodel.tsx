import { FC, useEffect, useState } from "react";
import { FCurrency, FDateCustom, Period } from "../../../lib/common";
import { DateRangeSelectWidget } from "../../daterange-select";
import NTabs from "../../tabs";
import { GPCAccount } from "../../../lib/models";
import Transactions from "./transactions";
import Downlines from "./downlines";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	makeStyles,
} from "@material-ui/core";
import { useRequest } from "../../../lib/hooks";
import { AccountModel } from "../../../lib/models-account";
import Loading from "../../loading";
import { InlineList } from "../../styled";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
	},
	period: {
		float: "left",
	},
	summary: {
		float: "right",
	},
}));

interface IProps {
	accountNo: string;
	onSelectAccount: (account: GPCAccount) => void;
}

const AccountModelWidget: FC<IProps> = ({ accountNo, onSelectAccount }) => {
	const classes = useStyles();
	const req = useRequest();

	const [period, setPeriod] = useState<Period>(
		new Period(undefined, undefined, "month")
	);

	const [data, setData] = useState<AccountModel>();

	const getAccountModel = async () => {
		const res = await req.get(
			`${
				process.env.REACT_APP_API
			}/gpcaccount/model?accountNo=${accountNo}&startDate=${period.startDate.toISOString()}&endDate=${period.endDate.toISOString()}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getAccountModel();
	}, [accountNo, period]);

	return (
		<div className={classes.root}>
			<div className={classes.period}>
				<DateRangeSelectWidget
					title="Select Period"
					period={period}
					onSelectionConfirmed={(value) => setPeriod(value)}
				/>
			</div>
			{data ? (
				<>
					<div className={classes.summary}>
						<InlineList>
							<li>
								<FormControl>
									<FormLabel>PSC</FormLabel>
									<h3>{FCurrency(data.psc)}</h3>
								</FormControl>
							</li>
							<li>
								<FormControl>
									<FormLabel>GSC</FormLabel>
									<h3>{FCurrency(data.gsc)}</h3>
								</FormControl>
							</li>
							<li>
								<FormControl>
									<FormLabel>LSC</FormLabel>
									<h3>{FCurrency(data.lsc)}</h3>
								</FormControl>
							</li>
							<li>
								<FormControl>
									<FormLabel>Total Commissions</FormLabel>
									<h3>{FCurrency(data.totalCommissions)}</h3>
								</FormControl>
							</li>
						</InlineList>
					</div>
					<NTabs
						tabHeaders={["Transactions", "Downlines"]}
						tabs={[
							<Transactions data={data.transactions} />,
							<Downlines
								data={data}
								onSelect={(account) => onSelectAccount(account)}
							/>,
						]}
					/>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default AccountModelWidget;

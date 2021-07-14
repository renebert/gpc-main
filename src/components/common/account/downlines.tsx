import { createStyles, Divider, makeStyles, Theme } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { FCurrency, FDateCustom, FDouble, Period } from "../../../lib/common";
import { useRequest } from "../../../lib/hooks";
import { GPCAccount } from "../../../lib/models";
import { AccountModel } from "../../../lib/models-account";
import { DateRangeSelectWidget } from "../../daterange-select";
import Loading from "../../loading";
import { InlineList, useClickableStyle } from "../../styled";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		"& ul": {
			margin: 0,
			padding: "10px 0 10px 20px",
		},
	},
	accountName: {
		cursor: "pointer",
	},
	figures: {
		position: "absolute",
		right: 0,
		"& li": {
			width: "120px",
		},
	},
	totalFigures: {
		"& li": {
			width: "120px",
		},
	},
}));

interface IProps {
	data: AccountModel;
	onSelect?: (account: GPCAccount) => void;
}

const AccountItem: FC<IProps> = ({ data, onSelect }) => {
	const classes = useStyles();
	const clickable = useClickableStyle();

	return (
		<div className={classes.root}>
			<div
				className={`${classes.accountName} ${clickable.root}`}
				onClick={() => onSelect && onSelect(data.account)}
			>
				<b>{data.account.profile?.name}</b>
				&nbsp;
				<small>({data.account.accountNo})</small>
				<div className={classes.figures}>
					<InlineList align="right">
						<li>{FDouble(data.transactions.pointValue)}</li>
						<li>{FDouble(data.transactions.amount)}</li>
					</InlineList>
				</div>
			</div>
			<ul>
				{data.downlines.map((x) => (
					<li>
						<AccountItem data={x} onSelect={onSelect} />
					</li>
				))}
			</ul>
		</div>
	);
};

interface IDownlinesWidgetProps {
	accountNo: string;
	refresh: Date;
	onSelect?: (account: GPCAccount) => void;
}

const DownlinesWidget: FC<IDownlinesWidgetProps> = ({
	accountNo,
	refresh,
	onSelect,
}) => {
	const classes = useStyles();
	const req = useRequest();

	const [period, setPeriod] = useState<Period>(
		new Period(undefined, undefined, "month")
	);

	const [data, setData] = useState<AccountModel>();

	const getDownlines = async () => {
		const res = await req.get(
			`${
				process.env.REACT_APP_API
			}/gpcaccount/downlines?accountNo=${accountNo}&startDate=${FDateCustom(
				period.startDate,
				"MM-DD-YYYY"
			)}&endDate=${FDateCustom(period.endDate, "MM-DD-YYYY")}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		refresh && getDownlines();
	}, [accountNo, period, refresh]);

	return (
		<>
			<InlineList>
				<li>
					<DateRangeSelectWidget
						title="Select Period"
						period={period}
						onSelectionConfirmed={(value) => setPeriod(value)}
					/>
				</li>
			</InlineList>

			{data && (
				<>
					<InlineList
						align="right"
						wrap={true}
						className={classes.totalFigures}
					>
						<li>
							<b>Point Value</b>
						</li>
						<li>
							<b>Amount (₱)</b>
						</li>
					</InlineList>
					<ul>
						{data.downlines.map((x) => (
							<li>
								<AccountItem data={x} onSelect={onSelect} />
							</li>
						))}
					</ul>
					<Divider />
					<InlineList
						align="right"
						wrap={true}
						className={classes.totalFigures}
					>
						<li>
							<h3>Total</h3>
						</li>
						<li>
							<h3>{FDouble(data.dlPointValue)}</h3>
						</li>
						<li>
							<h3>{FDouble(data.dlAmount)}</h3>
						</li>
					</InlineList>
				</>
			)}
		</>
	);
};

export default DownlinesWidget;

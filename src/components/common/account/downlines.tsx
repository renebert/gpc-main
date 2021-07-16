import { Divider, makeStyles } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { FDateCustom, FDouble, Period } from "../../../lib/common";
import { useRequest } from "../../../lib/hooks";
import { GPCAccount } from "../../../lib/models";
import { AccountModel } from "../../../lib/models-account";
import { InlineList, useClickableStyle } from "../../styled";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		"& ul": {
			margin: 0,
			padding: "0 0 10px 20px",
		},
	},
	accountName: {
		cursor: "pointer",
		borderBottom: "1px dotted #e0e0e0",
	},
	figures: {
		position: "absolute",
		top: 0,
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
	breakAways: string[];
}

const AccountItem: FC<IProps> = ({ data, onSelect, breakAways }) => {
	const classes = useStyles();
	const clickable = useClickableStyle();

	const isBreakAway =
		breakAways.find((x) => x == data.account.accountNo) != undefined;

	return (
		<div className={classes.root}>
			<div
				className={`${classes.accountName} ${clickable.root}`}
				onClick={() => onSelect && onSelect(data.account)}
			>
				<b>{data.account.profile?.name}</b>
				&nbsp;
				<small>
					({`${data.account.accountNo}, ${data.account.rank.description}`})
					{isBreakAway && " [Break-away]"}
				</small>
				{!isBreakAway && (
					<div className={classes.figures}>
						<InlineList align="right">
							<li>{FDouble(data.transactions.pointValue, 0)}</li>
							<li>{FDouble(data.transactions.amount)}</li>
						</InlineList>
					</div>
				)}
			</div>
			{!isBreakAway && (
				<ul>
					{data.downlines.map((x) => (
						<li>
							<AccountItem
								data={x}
								onSelect={onSelect}
								breakAways={breakAways}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

interface IDownlinesProps {
	data: AccountModel;
	onSelect?: (account: GPCAccount) => void;
}

const Downlines: FC<IDownlinesProps> = ({ data, onSelect }) => {
	const classes = useStyles();
	const req = useRequest();

	return (
		<>
			{data && (
				<>
					<InlineList
						align="right"
						wrap={true}
						className={classes.totalFigures}
					>
						<li>
							<b>PV</b>
						</li>
						<li>
							<b>Orders (₱)</b>
						</li>
					</InlineList>
					<ul>
						{data.downlines.map((x) => (
							<li>
								<AccountItem
									data={x}
									onSelect={onSelect}
									breakAways={data.breakAways}
								/>
							</li>
						))}
					</ul>
					<InlineList
						align="right"
						wrap={true}
						className={classes.totalFigures}
					>
						<li>
							<b>Total</b>
						</li>
						<li>
							<b>{FDouble(data.dlPointValue, 0)}</b>
						</li>
						<li>
							<b>{FDouble(data.dlAmount)}</b>
						</li>
					</InlineList>
				</>
			)}
		</>
	);
};

export default Downlines;

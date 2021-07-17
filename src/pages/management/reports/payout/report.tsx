import {
	createStyles,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	makeStyles,
	TextField,
	Theme,
} from "@material-ui/core";
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";
import { FC, useContext, useEffect, useState } from "react";
import {
	AccountTableSelect,
	AccountTableSelectDialog,
} from "../../../../components/data-select/account-table-select";
import { DateRangeSelectWidget } from "../../../../components/daterange-select";
import Loading from "../../../../components/loading";
import {
	InlineList,
	InlineListItem,
	useClickableStyle,
} from "../../../../components/styled";
import {
	FDateCustom,
	FDateTime,
	FDouble,
	Period,
} from "../../../../lib/common";
import { useRequest } from "../../../../lib/hooks";
import { GPCAccount } from "../../../../lib/models";
import { AccountModel } from "../../../../lib/models-account";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 16,
			paddingBottom: 6,
			borderBottom: "1px dotted gray",
		},
	})
);

interface IProps {}

const Report: FC<IProps> = () => {
	const req = useRequest();
	const classes = useStyles();
	const clickable = useClickableStyle();

	const [period, setPeriod] = useState<Period>(
		new Period(undefined, undefined, "month")
	);

	const [data, setData] = useState<AccountModel[] | null>(null);
	const [accountNos, setAccountNos] = useState<string[]>([]);
	const [refresh, setRefresh] = useState(new Date());
	const [open, setOpen] = useState(false);

	const [psc, setPSC] = useState(0);
	const [gsc, setGSC] = useState(0);
	const [lsc, setLSC] = useState(0);
	const [total, setTotal] = useState(0);

	const getTotals = () => {
		let _psc = 0;
		let _gsc = 0;
		let _lsc = 0;
		let _total = 0;

		data?.forEach((x) => {
			_psc += x.psc;
			_gsc += x.gsc;
			_lsc += x.lsc;
			_total += x.totalCommissions;
		});

		setPSC(_psc);
		setGSC(_gsc);
		setLSC(_lsc);
		setTotal(_total);
	};

	const getData = async (accountNos: string[]) => {
		setRefresh(new Date());

		const res = await req.post(`${process.env.REACT_APP_API}/report/payouts`, {
			accountNos: accountNos,
			startDate: period.startDate,
			endDate: period.endDate,
		});

		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getTotals();
	}, [data]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "name",
			headerName: "Name",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as AccountModel).account.profile.name,
		},
		{
			field: "accountNo",
			headerName: "Account No.",
			width: 170,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as AccountModel).account.accountNo,
		},
		{
			field: "rank",
			headerName: "Rank",
			width: 170,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as AccountModel).rank.description,
		},
		{
			field: "psc",
			headerName: "PSC (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble((params.row as AccountModel).psc),
		},
		{
			field: "gsc",
			headerName: "GSC (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble((params.row as AccountModel).gsc),
		},
		{
			field: "lsc",
			headerName: "LSC (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble((params.row as AccountModel).lsc),
		},
		{
			field: "total",
			headerName: "Total (₱)",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble((params.row as AccountModel).totalCommissions),
		},
	];

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
				<li>
					<FormControl>
						<FormLabel>Select Accounts</FormLabel>
						<div
							className={`${clickable.root} ${classes.root}`}
							onClick={(e) => setOpen(true)}
						>
							{accountNos.length == 0
								? "[No selection]"
								: `Selected ${accountNos.length} account(s)`}
						</div>
					</FormControl>
				</li>
			</InlineList>
			<br />

			{accountNos.length > 0 && (
				<>
					{data ? (
						<>
							<h4>Account List</h4>
							<small>As of {FDateTime(refresh)}</small>
							<div style={{ height: 400, width: "100%" }}>
								<DataGrid
									rows={data}
									columns={columns}
									hideFooterPagination={true}
									hideFooter={true}
									autoHeight
								/>
								<InlineList>
									<InlineListItem width={712}></InlineListItem>
									<InlineListItem width={140} align="right">
										<b>{FDouble(psc)}</b>
									</InlineListItem>
									<InlineListItem width={140} align="right">
										<b>{FDouble(gsc)}</b>
									</InlineListItem>
									<InlineListItem width={140} align="right">
										<b>{FDouble(lsc)}</b>
									</InlineListItem>
									<InlineListItem width={140} align="right">
										<b>{FDouble(total)}</b>
									</InlineListItem>
								</InlineList>
							</div>
						</>
					) : (
						<Loading />
					)}
				</>
			)}
			<AccountTableSelectDialog
				date={refresh}
				open={open}
				setOpen={setOpen}
				onSelectionConfirmed={(value: GPCAccount[]) => {
					const selection = value.map((x) => x.accountNo);
					setAccountNos(selection);
					setData(null);
					getData(selection);
				}}
			/>
		</>
	);
};

export default Report;

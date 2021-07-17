import { FC, useContext, useEffect, useState } from "react";
import Landing from "./landing-page";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { NotificationContext } from "../../../lib/notifications";
import { AccountOrder } from "../../../lib/models-inventory";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
} from "@material-ui/data-grid";
import { FDate, FDateTime } from "../../../lib/common";
import { QuickProfile } from "../../../lib/models";
import Loading from "../../../components/loading";
import { IconButton, Tooltip } from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";

interface IProps {
	refresh: Date;
}

const AccountOrderReset: FC<IProps> = ({ refresh }) => {
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<AccountOrder[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${process.env.REACT_APP_API}/document-reset/accountorder/list`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	const resetDocument = async (id: number) => {
		const confirmed = await nc.confirmbox.show(
			"Are you sure you want to reset this document?"
		);
		if (confirmed) {
			const res = await req.post(
				`${process.env.REACT_APP_API}/document-reset/accountorder?id=${id}`
			);
			if (res.success) {
				nc.snackbar.show("Record was successfully reset");
				getList();
			}
		}
	};

	useEffect(() => {
		getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "docDate",
			headerName: "Date",
			width: 110,
			valueFormatter: (params: GridValueFormatterParams) =>
				FDate(new Date(params.value as Date)),
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
		},
		{
			field: "confirmed",
			headerName: "Status",
			width: 320,
			headerAlign: "center",
			align: "center",
			renderCell: (params: GridCellParams) => {
				const confirmedBy = params.getValue(
					params.id,
					"confirmedBy"
				) as QuickProfile;

				const dateConfirmed = params.getValue(
					params.id,
					"dateConfirmed"
				) as Date;

				return (
					<>
						<div>{`Confirmed by ${confirmedBy.name}`}</div>
						<small>{FDateTime(dateConfirmed)}</small>
					</>
				);
			},
		},
		{
			field: "",
			filterable: false,
			sortable: false,
			disableColumnMenu: true,
			flex: 0.3,
			cellClassName: "row-commands",
			renderCell: (params: GridCellParams) => {
				return (
					<Tooltip title={`Reset Doc # ${params.id}`}>
						<IconButton
							onClick={() => resetDocument(Number(params.id))}
							size="small"
						>
							<HistoryIcon />
						</IconButton>
					</Tooltip>
				);
			},
		},
	];

	return (
		<>
			<Landing />

			{data ? (
				<>
					<h4>Account Order Documents</h4>
					<small>As of {FDateTime(refresh)}</small>
					<DataGrid
						rows={data}
						columns={columns}
						hideFooterPagination={true}
						autoHeight
					/>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default AccountOrderReset;

import { FC, useContext, useEffect, useState } from "react";
import { RequestType, useGlobal, useRequest } from "../../../../lib/hooks";
import { Button } from "@material-ui/core";
import { Incentive } from "../../../../lib/models-bm";
import { FCurrency, FDateTime, FDouble } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";

import Loading from "../../../../components/loading";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import {
	Notification,
	NotificationContext,
} from "../../../../lib/notifications";
import { Global } from "../../../../lib/global";
import { IncentiveRates } from "../../../../lib/models-account";

interface IProps {
	refresh: Date;
}

const List: FC<IProps> = ({ refresh }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<Incentive[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${process.env.REACT_APP_API}/business-model/Incentives/list`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	const open = (openData: Incentive, mode: PageModeType) => {
		(
			ps.Get("incentives-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: openData });

		(
			ps.Get("incentives-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)(mode);
	};

	useEffect(() => {
		getList();
	}, [refresh]);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "code",
			headerName: "Code",
			width: 300,
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
		},
		{
			field: "rate",
			headerName: "Rate",
			width: 150,
			headerAlign: "right",
			align: "right",
			type: "number",
			valueGetter: (params: GridValueGetterParams) => {
				const r = params.row as Incentive;
				return r.isPerc ? `${r.rate}%` : FCurrency(r.rate);
			},
		},
		{
			field: "",
			filterable: false,
			sortable: false,
			disableColumnMenu: true,
			flex: 0.3,
			cellClassName: "row-commands",
			renderCell: (params: GridCellParams) => (
				<>
					<Tooltip title="View">
						<IconButton
							onClick={() => open(params.row as Incentive, "view")}
							size="small"
						>
							<PageviewIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Edit">
						<IconButton
							onClick={() => open(params.row as Incentive, "edit")}
							size="small"
						>
							<EditIcon />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<>
			{data ? (
				<>
					<h4>Incentive List</h4>
					<small>As of {FDateTime(refresh)}</small>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							rows={data}
							columns={columns}
							hideFooterPagination={true}
							autoHeight
						/>
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default List;

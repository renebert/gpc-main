import { FC, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Badge, Box, Button } from "@material-ui/core";
import { Delivery, DeliveryItem } from "../../../../lib/models-inventory";
import { FDate, FDateTime } from "../../../../lib/common";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
} from "@material-ui/data-grid";

import Loading from "../../../../components/loading";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import PageCommands from "../../../../components/page-commands";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { NotificationContext } from "../../../../lib/notifications";

export interface IItemProps {
	refresh: Date;
	delivery: Delivery;
}

const Items: FC<IItemProps> = ({ refresh, delivery }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const [data, setData] = useState<DeliveryItem[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${g.API_URL}/inventory/delivery-items?parentId=${delivery.id}`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getList();
	}, [refresh]);

	const backToList = () => {
		(
			ps.Get("deliveries-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const columns: GridColDef[] = [{ field: "id", headerName: "Id", width: 90 }];

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			<Box textAlign="center">
				<b>{delivery.description}</b>
				<br />
				<small>{`Date: ${FDate(delivery.docDate)} | DR # ${
					delivery.drNo
				} | PO # ${delivery.poNo}`}</small>
			</Box>
			<br />

			{data ? (
				<>
					<h4>Delivery Items</h4>
					<small>As of {FDateTime(refresh)}</small>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							rows={data}
							columns={columns}
							pageSize={pageSize}
							onPageSizeChange={(params: GridPageChangeParams) =>
								setPageSize(params.pageSize)
							}
							rowsPerPageOptions={[5, 10, 20]}
							pagination
							autoHeight
						/>
					</div>
					<PageCommands>
						<Button variant="contained" color="default" onClick={backToList}>
							Back to Delivery list
						</Button>
						<Button variant="contained" color="primary">
							Add
						</Button>
					</PageCommands>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Items;

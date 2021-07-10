import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../../components/page-commands";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { WarehouseOrder, Warehouse } from "../../../../lib/models-inventory";
import { NotificationContext } from "../../../../lib/notifications";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import Form from "./form";

interface IProps {
	parent: Warehouse;
}

const Create: FC<IProps> = ({ parent }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const handleSubmit = async (data: WarehouseOrder) => {
		nc.processing.show();
		let res = await req.post(
			`${g.API_URL}/inventory/warehouse-order/save`,
			data
		);
		if (res.success) {
			nc.snackbar.show("Record was successfully saved");
			backToView(res.data);
		}
		nc.processing.hide();
	};

	const backToList = () => {
		(
			ps.Get("warehouseOrders-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const backToView = (data: WarehouseOrder) => {
		(
			ps.Get("warehouseOrders-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });
		(
			ps.Get("warehouseOrders-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("view");
	};

	const submitForm = () => {
		(
			ps.Get("create-warehouseOrder-form-setExecSubmit")
				?.dispatch as React.Dispatch<React.SetStateAction<Date | null>>
		)(new Date());
	};

	const newData = new WarehouseOrder();
	newData.warehouseId = parent.id;

	return (
		<>
			<h4>Create Warehouse Order</h4>
			<Form onSubmit={handleSubmit} data={newData} />
			<PageCommands>
				<Button variant="contained" color="default" onClick={backToList}>
					Cancel
				</Button>
				<Button variant="contained" color="primary" onClick={submitForm}>
					Save
				</Button>
			</PageCommands>
		</>
	);
};

export default Create;

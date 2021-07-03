import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../../components/page-commands";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Category } from "../../../../lib/models-inventory";
import { NotificationContext } from "../../../../lib/notifications";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import Form from "./form";

const Create: FC = () => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const handleSubmit = async (data: Category) => {
		nc.processing.show();
		let res = await req.post(`${g.API_URL}/inventory/category/save`, data);
		if (res.success) {
			nc.snackbar.show("Record was successfully saved");
			backToList();
		}
		nc.processing.hide();
	};

	const backToList = () => {
		(
			ps.Get("categorys-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const submitForm = () => {
		(
			ps.Get("create-category-form-setExecSubmit")?.dispatch as React.Dispatch<
				React.SetStateAction<Date | null>
			>
		)(new Date());
	};

	return (
		<>
			<h4>Create Category</h4>
			<Form onSubmit={handleSubmit} />
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

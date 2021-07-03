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

interface IProps {
	data?: Category;
	caller?: PageModeType;
}

const Edit: FC<IProps> = ({ data, caller }) => {
	const ps = useContext(PageStateContext);

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	if (!data) return <div>No data provided</div>;

	const handleSubmit = async (data: Category) => {
		nc.processing.show();
		let res = await req.post(`${g.API_URL}/inventory/category/save`, data);
		if (res.success) {
			nc.snackbar.show("Record was successfully saved");
			backToCaller(res.data);
		}
		nc.processing.hide();
	};

	const backToCaller = (data?: Category) => {
		(
			ps.Get("categorys-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });

		(
			ps.Get("categorys-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)(caller ?? "list");
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
			<h4>Update Category</h4>
			<Form onSubmit={handleSubmit} data={data} />
			<PageCommands>
				<Button
					variant="contained"
					color="default"
					onClick={() => backToCaller(data)}
				>
					Cancel
				</Button>
				<Button variant="contained" color="primary" onClick={submitForm}>
					Save
				</Button>
			</PageCommands>
		</>
	);
};

export default Edit;

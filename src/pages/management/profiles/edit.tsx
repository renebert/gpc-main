import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import Form from "../../../components/common/profile/form";
import PageCommands from "../../../components/page-commands";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { Profile } from "../../../lib/models";
import { NotificationContext } from "../../../lib/notifications";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";

interface IProps {
	data?: Profile;
}

const Edit: FC<IProps> = ({ data }) => {
	const ps = useContext(PageStateContext);

	const req = useRequest();
	const nc = useContext(NotificationContext);

	if (!data) return <div>No data provided</div>;

	const handleSubmit = async (data: Profile) => {
		nc.processing.show();
		let res = await req.post(`${process.env.REACT_APP_API}/profile/save`, data);
		if (res.success) {
			nc.snackbar.show("Record was successfully saved");
			backToView(res.data);
		}
		nc.processing.hide();
	};

	const backToView = (data?: Profile) => {
		(
			ps.Get("management-profiles-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });

		(
			ps.Get("management-profiles-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("view");
	};

	const submitForm = () => {
		(
			ps.Get("common-profile-form-setExecSubmit")?.dispatch as React.Dispatch<
				React.SetStateAction<Date | null>
			>
		)(new Date());
	};

	return (
		<>
			<h4>Update Profile</h4>
			<Form onSubmit={handleSubmit} data={data} />
			<PageCommands>
				<Button
					variant="contained"
					color="default"
					onClick={() => backToView(data)}
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

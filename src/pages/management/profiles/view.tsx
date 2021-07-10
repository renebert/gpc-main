import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../components/page-commands";
import { Profile } from "../../../lib/models";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import { StyledViewPage } from "../../../components/styled";
import ProfileView from "../../../components/common/profile/view";

interface IProps {
	data?: Profile;
}

const View: FC<IProps> = ({ data }) => {
	const ps = useContext(PageStateContext);

	if (!data) return <div>No data provided</div>;

	const backToList = () => {
		(
			ps.Get("management-profiles-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	const edit = () => {
		(
			ps.Get("management-profiles-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });

		(
			ps.Get("management-profiles-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("edit");
	};

	const create = () => {
		const d = new Profile();

		(
			ps.Get("management-profiles-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: d });

		(
			ps.Get("management-profiles-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("create");
	};

	return (
		<>
			<h4>View Profile</h4>

			<StyledViewPage>
				<ProfileView data={data} />
			</StyledViewPage>

			<PageCommands>
				<Button variant="contained" color="default" onClick={backToList}>
					Back to list
				</Button>
				<Button variant="contained" color="primary" onClick={edit}>
					Edit
				</Button>
			</PageCommands>
		</>
	);
};

export default View;

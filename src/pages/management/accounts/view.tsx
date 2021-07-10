import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import PageCommands from "../../../components/page-commands";
import { GPCAccount } from "../../../lib/models";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { NotificationContext } from "../../../lib/notifications";
import { StyledViewPage } from "../../../components/styled";
import GPCAccountView from "../../../components/common/account/view";

interface IProps {
	data?: GPCAccount;
}

const View: FC<IProps> = ({ data }) => {
	const ps = useContext(PageStateContext);

	if (!data) return <div>No data provided</div>;

	const backToList = () => {
		(
			ps.Get("management-accounts-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("list");
	};

	return (
		<>
			<h4>View Account</h4>

			<GPCAccountView data={data} />

			<PageCommands>
				<Button variant="contained" color="default" onClick={backToList}>
					Back to list
				</Button>
			</PageCommands>
		</>
	);
};

export default View;

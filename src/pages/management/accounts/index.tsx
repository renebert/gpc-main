import { FC, useContext, useState } from "react";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import List from "./list";
import View from "./view";
import Landing from "../landing-page";
import Edit from "./edit";

const GPCAccounts: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("list");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "management-accounts-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "management-accounts-setOpenProps", dispatch: setOpenProps });

	return (
		<>
			<Landing />
			{pageMode == "list" && <List refresh={new Date()} />}
			{pageMode == "view" && <View {...openProps} />}
			{pageMode == "edit" && <Edit {...openProps} />}
		</>
	);
};

export default GPCAccounts;

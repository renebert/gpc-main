import { FC, useContext, useState } from "react";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import List from "./list";
import Edit from "./edit";
import View from "./view";
import Landing from "../landing-page";

const Profiles: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("list");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "management-profiles-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "management-profiles-setOpenProps", dispatch: setOpenProps });

	return (
		<>
			<Landing />
			{pageMode == "list" && <List refresh={new Date()} />}
			{pageMode == "edit" && <Edit {...openProps} />}
			{pageMode == "view" && <View {...openProps} />}
		</>
	);
};

export default Profiles;

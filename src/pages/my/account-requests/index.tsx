import { FC, useContext, useState } from "react";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import Landing from "../landing-page";
import List from "./list";
import View from "./view";

const GPCAccountRequests: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("list");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "account-requests-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "account-requests-setOpenProps", dispatch: setOpenProps });

	return (
		<>
			<Landing />
			{pageMode == "list" && <List refresh={new Date()} />}
			{pageMode == "view" && <View {...openProps} />}
		</>
	);
};

export default GPCAccountRequests;

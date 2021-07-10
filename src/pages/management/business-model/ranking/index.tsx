import { FC, useContext, useState } from "react";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import List from "./list";
import Create from "./create";
import Edit from "./edit";
import View from "./view";
import Landing from "../landing-page";

const Rankings: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("list");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "rankings-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "rankings-setOpenProps", dispatch: setOpenProps });

	return (
		<>
			<Landing />
			{pageMode == "list" && <List refresh={new Date()} />}
			{pageMode == "create" && <Create />}
			{pageMode == "edit" && <Edit {...openProps} />}
			{pageMode == "view" && <View {...openProps} />}
		</>
	);
};

export default Rankings;

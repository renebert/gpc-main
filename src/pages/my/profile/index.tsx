import { FC, useContext, useState } from "react";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import Landing from "../landing-page";
import Edit from "./edit";
import View from "./view";

const Profile: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("view");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "myprofile-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "myprofile-setOpenProps", dispatch: setOpenProps });

	return (
		<>
			<Landing />
			{pageMode == "view" && <View {...openProps} />}
			{pageMode == "edit" && <Edit {...openProps} />}
		</>
	);
};

export default Profile;

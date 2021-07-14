import { FC, useContext, useEffect, useState } from "react";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import Edit from "./edit";
import View from "./view";
import { useGlobal } from "../../../lib/hooks";
import Landing from "../landing-page";

const UplineClaims: FC = () => {
	const g = useGlobal();
	const [pageMode, setPageMode] = useState<PageModeType>("view");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "uplineclaim-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "uplineclaim-setOpenProps", dispatch: setOpenProps });

	useEffect(() => {
		setOpenProps({ ...openProps, data: g.UplineClaim });
	}, []);

	return (
		<>
			<Landing />
			{pageMode === "edit" && <Edit {...openProps} />}
			{pageMode === "view" && <View {...openProps} />}
		</>
	);
};

export default UplineClaims;

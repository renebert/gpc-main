import { FC } from "react";
import { Link } from "react-router-dom";
import { useGlobal, useLayout } from "../../lib/hooks";
import { LayoutElement } from "../../lib/layoutContext";
import Base from "../base";

const Profile: FC = () => {
	const g = useGlobal();
	const { DisableRightSidePanel, SetRightSidePanel } = useLayout();

	//SetRightSidePanel([new LayoutElement(<Link to="/">Main</Link>)]);
	DisableRightSidePanel();

	return (
		<Base>
			<div>profile</div>
			<Link to="/">Main</Link>
		</Base>
	);
};

export default Profile;

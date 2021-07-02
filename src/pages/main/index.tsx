import { FC } from "react";
import { useGlobal, useLayout } from "../../lib/hooks";
import Base from "../base";
import { Link } from "react-router-dom";
import { LayoutElement } from "../../lib/layoutContext";

const Main: FC = () => {
	const g = useGlobal();
	const { SetRightSidePanel } = useLayout();

	SetRightSidePanel([new LayoutElement(<Link to="/profile">Profile</Link>)]);

	return (
		<Base>
			<div>main</div>
			{g.User?.name}
		</Base>
	);
};

export default Main;

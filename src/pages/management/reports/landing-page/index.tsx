import { Button } from "@material-ui/core";
import { FC } from "react";
import "../../../../style.scss";
import { useNavigation } from "../../../../lib/hooks";

export const LandingMenu: FC = () => {
	const { go } = useNavigation();

	return (
		<div className="landing-page-menu">
			<Button onClick={() => go("payout-report")}>Payout</Button>
		</div>
	);
};

const Landing: FC = () => {
	return (
		<>
			<h3>Reports</h3>

			<p>Please select your task</p>
			<LandingMenu />
			<hr />
		</>
	);
};

export default Landing;

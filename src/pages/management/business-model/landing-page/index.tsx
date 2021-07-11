import { Button } from "@material-ui/core";
import { FC } from "react";
import "../../../../style.scss";
import { useNavigation } from "../../../../lib/hooks";

const LandingMenu: FC = () => {
	const { go } = useNavigation();

	return (
		<div className="landing-page-menu">
			<Button onClick={() => go("bm-ranking")}>Ranking</Button>
			<Button onClick={() => go("bm-incentives")}>Incentives</Button>
		</div>
	);
};

const Landing: FC = () => {
	return (
		<>
			<h3>Business Model</h3>

			<p>Please select your task</p>
			<LandingMenu />
			<hr />
			<br />
		</>
	);
};

export default Landing;

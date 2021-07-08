import { Button } from "@material-ui/core";
import { FC } from "react";
import "../../../../style.scss";
import { useNavigation } from "../../../../lib/hooks";

export const LandingMenu: FC = () => {
	const { go } = useNavigation();

	return (
		<div className="landing-page-menu">
			<Button onClick={() => go("online-applications-account-requests")}>
				Account Requests
			</Button>
		</div>
	);
};

const Landing: FC = () => {
	return (
		<>
			<h3>Manage Online Applications</h3>

			<p>Please select your task</p>
			<LandingMenu />
			<hr />
			<br />
		</>
	);
};

export default Landing;

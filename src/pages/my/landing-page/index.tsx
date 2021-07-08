import { Button } from "@material-ui/core";
import { FC } from "react";
import "../../../style.scss";
import { useNavigation } from "../../../lib/hooks";

export const LandingMenu: FC = () => {
	const { go } = useNavigation();

	return (
		<div className="landing-page-menu">
			<Button onClick={() => go("my-profile")}>Profile</Button>
			<Button onClick={() => go("my-uplineclaim")}>Upline Claim</Button>
			<Button onClick={() => go("my-account-requests")}>
				Account Requests
			</Button>
			&nbsp;|&nbsp;
			<Button onClick={() => go("my-account")}>Account</Button>
		</div>
	);
};

const Landing: FC = () => {
	return (
		<>
			<h3>My</h3>

			<p>Please select where you want to go</p>
			<LandingMenu />
			<hr />
			<br />
		</>
	);
};

export default Landing;

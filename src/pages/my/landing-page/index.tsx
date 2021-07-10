import { Button } from "@material-ui/core";
import { FC } from "react";
import "../../../style.scss";
import { useGlobal, useNavigation } from "../../../lib/hooks";

export const LandingMenu: FC = () => {
	const g = useGlobal();
	const { go } = useNavigation();

	return (
		<div className="landing-page-menu">
			<Button onClick={() => go("my-profile")}>Profile</Button>
			{g.HasGPCAccount && (
				<Button onClick={() => go("my-uplineclaim")}>Upline Claim</Button>
			)}
			<Button onClick={() => go("my-account-requests")}>
				Account Requests
			</Button>
			{g.HasGPCAccount && (
				<>
					&nbsp;|&nbsp;
					<Button onClick={() => go("my-account")}>Account</Button>
				</>
			)}
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

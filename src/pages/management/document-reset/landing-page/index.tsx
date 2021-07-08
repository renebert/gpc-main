import { Button } from "@material-ui/core";
import { FC } from "react";
import "../../../../style.scss";
import { useNavigation } from "../../../../lib/hooks";

export const LandingMenu: FC = () => {
	const { go } = useNavigation();

	return (
		<div className="landing-page-menu">
			<Button onClick={() => go("delivery-reset")}>Delivery</Button>
			<Button onClick={() => go("pricelist-reset")}>Price List</Button>
			<Button onClick={() => go("accountorder-reset")}>Account Order</Button>
		</div>
	);
};

const Landing: FC = () => {
	return (
		<>
			<h3>Document Reset</h3>

			<p>Please select document type</p>
			<LandingMenu />
			<hr />
			<br />
		</>
	);
};

export default Landing;

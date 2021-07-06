import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import PageStateContext from "../../../../lib/pageStateContext";
import { ActiveComponentType } from "../../../base-page";
import "../../../../style.scss";

export const LandingMenu: FC = () => {
	const ps = useContext(PageStateContext);

	const go = (component: ActiveComponentType) => {
		(
			ps.Get("base-active-component")?.dispatch as React.Dispatch<
				React.SetStateAction<string>
			>
		)(component);
	};
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

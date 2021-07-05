import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import PageStateContext from "../../../../lib/pageStateContext";
import { ActiveComponentType } from "../../../base-page";
import "./style.scss";

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
			<Button onClick={() => go("delivery")}>Delivery</Button>
			<Button onClick={() => go("pricelist")}>Price List</Button>
			&nbsp;|&nbsp;
			<Button onClick={() => go("units")}>Units</Button>
			<Button onClick={() => go("categories")}>Categories</Button>
			<Button onClick={() => go("warehouse")}>Warehouse</Button>
			<Button onClick={() => go("stocks")}>Stocks</Button>
		</div>
	);
};

const Landing: FC = () => {
	return (
		<>
			<h3>Welcome to Inventory</h3>

			<p>Please select your task</p>
			<LandingMenu />
			<hr />
			<br />
		</>
	);
};

export default Landing;

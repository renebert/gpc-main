import { Button } from "@material-ui/core";
import { FC } from "react";
import "../../../../style.scss";
import { useNavigation } from "../../../../lib/hooks";

const LandingMenu: FC = () => {
	const { go } = useNavigation();

	return (
		<div className="landing-page-menu">
			<Button onClick={() => go("delivery")}>Delivery</Button>
			<Button onClick={() => go("pricelist")}>Price List</Button>
			<Button onClick={() => go("account-order")}>Account Order</Button>
			&nbsp;|&nbsp;
			<Button onClick={() => go("inventory-report")}>Inventory</Button>
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
			<h3>Inventory</h3>

			<p>Please select your task</p>
			<LandingMenu />
			<hr />
			<br />
		</>
	);
};

export default Landing;

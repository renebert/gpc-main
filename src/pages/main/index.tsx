import { FC, useContext } from "react";
import { useGlobal, useLayout } from "../../lib/hooks";
import BasePage from "../base-page";
import { Link } from "react-router-dom";
import { LayoutElement } from "../../lib/layoutContext";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { BottomNavigationAction, Button } from "@material-ui/core";
import MenuCreator from "../../components/menu";
import PageHeader from "../base-page/page-header";
import { NotificationContext } from "../../lib/notifications";

const Main: FC = () => {
	const g = useGlobal();
	const nc = useContext(NotificationContext);
	const { SetPageCommands, SetRightSidePanel } = useLayout();

	SetRightSidePanel([new LayoutElement(<MenuCreator />)]);
	SetPageCommands([
		new LayoutElement(
			<BottomNavigationAction label="Recents" icon={<FavoriteIcon />} />,
			"main"
		),
	]);
	return (
		<BasePage
			header={
				<PageHeader
					prev={[{ text: "Home", link: "/" }]}
					title="Inventory"
					wcText="Units"
				/>
			}
		>
			<div>main</div>
			<br />
			<br />
			<Button
				onClick={async () => {
					// const c = await nc.confirmbox.show("yes?");
					// nc.msgbox.show(c ? "true" : "false");
				}}
			>
				test
			</Button>
		</BasePage>
	);
};

export default Main;

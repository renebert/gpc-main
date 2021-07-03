import Restore from "@material-ui/icons/Restore";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGlobal, useLayout } from "../../lib/hooks";
import { LayoutElement } from "../../lib/layoutContext";
import BasePage from "../base-page";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { BottomNavigationAction } from "@material-ui/core";
import PageHeader from "../base-page/page-header";

const Profile: FC = () => {
	const g = useGlobal();
	const { SetPageCommands, SetRightSidePanel } = useLayout();

	SetRightSidePanel([new LayoutElement(<Link to="/">Main</Link>)]);
	SetPageCommands([
		new LayoutElement(
			<BottomNavigationAction label="Recents" icon={<Restore />} />
		),
		new LayoutElement(
			<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
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
			<div>profile</div>
			<Link to="/">Main</Link>
		</BasePage>
	);
};

export default Profile;

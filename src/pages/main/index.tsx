import { FC, useContext } from "react";
import { useGlobal } from "../../lib/hooks";
import BasePage from "../base-page";
import { Link } from "react-router-dom";
import { LayoutElement } from "../../lib/layoutContext";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { BottomNavigationAction, Button, Typography } from "@material-ui/core";
import MenuCreator from "../../components/menu";
import PageHeader from "../base-page/page-header";
import { NotificationContext } from "../../lib/notifications";

const Main: FC = () => {
	const g = useGlobal();
	const nc = useContext(NotificationContext);

	return (
		<>
			<h3>{`Hello ${g.Name}, welcome to ${process.env.REACT_APP_COMPANY_NAME}`}</h3>
			<hr />
			<br />
			[Your dash board goes here...]
		</>
	);
};

export default Main;

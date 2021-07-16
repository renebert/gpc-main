import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { FC, useContext } from "react";
import { Tooltip } from "@material-ui/core";
import { ActiveComponentType } from ".";
import { ReactComponent as LogoutIcon } from "../../assets/log-out.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationContext } from "../../lib/notifications";

import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from "@material-ui/icons/Store";
import HistoryIcon from "@material-ui/icons/History";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import BusinessIcon from "@material-ui/icons/Business";
import ExtensionIcon from "@material-ui/icons/Extension";
import AssessmentIcon from "@material-ui/icons/Assessment";

type MenuDataType = {
	type: "standard" | "divider" | "logout";
	key: ActiveComponentType;
	label: string;
	icon: JSX.Element;
	callback?: () => void;
};

const mnuData: MenuDataType[] = [
	{
		type: "standard",
		key: "main",
		label: "Home",
		icon: <HomeIcon />,
	},
	{
		type: "standard",
		key: "my-landing",
		label: "My",
		icon: <AccountCircleIcon />,
	},
	{
		type: "divider",
		key: "n/a",
		label: "",
		icon: <></>,
	},
	{
		type: "standard",
		key: "reports-landing",
		label: "Reports",
		icon: <AssessmentIcon />,
	},
	{
		type: "standard",
		key: "management-landing",
		label: "Management",
		icon: <BusinessIcon />,
	},
	{
		type: "standard",
		key: "inventory-landing",
		label: "Inventory",
		icon: <StoreIcon />,
	},
	{
		type: "standard",
		key: "online-applications-landing",
		label: "Online Applications",
		icon: <CloudDoneIcon />,
	},
	{
		type: "standard",
		key: "document-reset-landing",
		label: "Document Reset",
		icon: <HistoryIcon />,
	},
	{
		type: "divider",
		key: "n/a",
		label: "",
		icon: <></>,
	},
	{
		type: "standard",
		key: "bm-landing",
		label: "Business Model",
		icon: <ExtensionIcon />,
	},
	{
		type: "divider",
		key: "n/a",
		label: "",
		icon: <></>,
	},
	{
		type: "logout",
		key: "online-applications-landing",
		label: "Logout",
		icon: <LogoutIcon fontSize="10px" />,
	},
];

interface IProps {
	activate: (component: ActiveComponentType) => void;
}

const Menu: FC<IProps> = ({ activate }) => {
	const { logout } = useAuth0();
	const nc = useContext(NotificationContext);

	const goLogout = async () => {
		const confirmed = await nc.confirmbox.show(
			"Are you sure you want to logout?"
		);
		if (confirmed) {
			logout();
		}
	};

	return (
		<>
			<List>
				{mnuData.map((x) => (
					<>
						{x.type == "divider" ? (
							<Divider />
						) : (
							<ListItem
								button
								key={x.key}
								onClick={() =>
									x.type == "logout" ? goLogout() : activate(x?.key)
								}
							>
								<ListItemIcon>
									<Tooltip title={x.label}>{x.icon}</Tooltip>
								</ListItemIcon>
								<ListItemText primary={x.label} />
							</ListItem>
						)}
					</>
				))}
			</List>
			<Divider />
		</>
	);
};

export default Menu;

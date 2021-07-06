import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { FC } from "react";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from "@material-ui/icons/Store";
import HistoryIcon from "@material-ui/icons/History";
import { Tooltip } from "@material-ui/core";
import { ActiveComponentType } from ".";

type MenuDataType = {
	key: ActiveComponentType;
	label: string;
	icon: JSX.Element;
};

const mnuData: MenuDataType[] = [
	{
		key: "main",
		label: "Home",
		icon: <HomeIcon />,
	},
	{
		key: "inventory-landing",
		label: "Inventory",
		icon: <StoreIcon />,
	},
	{
		key: "document-reset-landing",
		label: "Document Reset",
		icon: <HistoryIcon />,
	},
];

interface IProps {
	activate: (component: ActiveComponentType) => void;
}

const Menu: FC<IProps> = ({ activate }) => {
	return (
		<>
			<List>
				{mnuData.map((x) => (
					<ListItem button key={x.key} onClick={() => activate(x.key)}>
						<ListItemIcon>
							<Tooltip title={x.label}>{x.icon}</Tooltip>
						</ListItemIcon>
						<ListItemText primary={x.label} />
					</ListItem>
				))}
			</List>
			<Divider />
		</>
	);
};

export default Menu;

import { FC, useEffect, useState } from "react";
import MenuData from "../../lib/menu.json";
import { Link } from "react-router-dom";

type MenuDataObject = {
	id: string;
	title: string;
	url: string;
	subMenu: MenuDataObject[];
};

interface IProps {
	baseId?: string;
}

const MenuCreator: FC<IProps> = ({ baseId }) => {
	const [menu, setMenu] = useState(<></>);

	const create = (bId: string) => {
		const ui = (
			<ul>
				{MenuData.filter((x) => bId == "" || x.id == bId).map((x) => makeUI(x))}
			</ul>
		);

		setMenu(ui);
	};

	const makeUI = (o: MenuDataObject) => {
		const hasSubMenu = o.subMenu.length > 0;

		return (
			<li>
				<Link to={o.url}>{o.title}</Link>
				{hasSubMenu && <ul>{o.subMenu.map((x) => makeUI(x))}</ul>}
			</li>
		);
	};

	useEffect(() => {
		create(baseId ?? "");
	}, []);

	return <>{menu}</>;
};

export default MenuCreator;

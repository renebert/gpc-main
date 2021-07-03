import { FC, useContext, useState } from "react";
import BasePage from "../../../base-page";
import PageHeader from "../../../base-page/page-header";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import List from "./list";
import Create from "./create";
import Edit from "./edit";
import View from "./view";

const Stocks: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("list");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "stocks-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "stocks-setOpenProps", dispatch: setOpenProps });

	return (
		<>
			<BasePage
				header={
					<PageHeader
						prev={[{ text: "Home", link: "/" }]}
						title="Inventory"
						wcText="Stocks"
					/>
				}
			>
				{pageMode == "list" && <List refresh={new Date()} />}
				{pageMode == "create" && <Create />}
				{pageMode == "edit" && <Edit {...openProps} />}
				{pageMode == "view" && <View {...openProps} />}
			</BasePage>
		</>
	);
};

export default Stocks;

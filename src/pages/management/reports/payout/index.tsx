import { FC, useContext, useState } from "react";
import { WarehouseSelect } from "../../../../components/data-select/warehouse-select";
import { DateRangeSelectWidget } from "../../../../components/daterange-select";
import { Period } from "../../../../lib/common";
import { Warehouse } from "../../../../lib/models-inventory";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import Landing from "../landing-page";
import Report from "./report";

const InventoryReport: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("index");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "pricelists-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "pricelists-setOpenProps", dispatch: setOpenProps });

	return (
		<>
			<Landing />
			<>
				<h4>Payout</h4>
				{pageMode == "index" && <Report />}
			</>
		</>
	);
};

export default InventoryReport;

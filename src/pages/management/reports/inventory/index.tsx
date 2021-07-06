import { FC, useContext, useState } from "react";
import { WarehouseSelect } from "../../../../components/data-select/warehouse-select";
import { Warehouse } from "../../../../lib/models-inventory";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import Landing from "../../inventory/landing-page";
import Report from "./report";

const InventoryReport: FC = () => {
	const [pageMode, setPageMode] = useState<PageModeType>("index");
	const [openProps, setOpenProps] = useState<object>({});

	const ps = useContext(PageStateContext);
	ps.Add({ key: "pricelists-setPageMode", dispatch: setPageMode });
	ps.Add({ key: "pricelists-setOpenProps", dispatch: setOpenProps });

	const warehouseCookie = sessionStorage.getItem("warehouse-selection");
	const [warehouse, setWarehouse] = useState<Warehouse | null>(
		warehouseCookie ? JSON.parse(warehouseCookie) : null
	);

	const handleWarehouseSelect = (value: Warehouse | undefined) => {
		if (value) {
			setWarehouse(value);
			sessionStorage.setItem("warehouse-selection", JSON.stringify(value));
		} else {
			setWarehouse(null);
			sessionStorage.removeItem("warehouse-selection");
		}
		setPageMode("index");
	};

	return (
		<>
			<Landing />

			<WarehouseSelect
				value={warehouse ?? undefined}
				onChange={handleWarehouseSelect}
			/>
			<br />
			{warehouse ? (
				<>
					<h4>Inventory</h4>
					{pageMode == "index" && <Report warehouseId={warehouse.id} />}
				</>
			) : (
				<>[Please select a warehouse to work on]</>
			)}
		</>
	);
};

export default InventoryReport;

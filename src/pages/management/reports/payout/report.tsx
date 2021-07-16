import { Divider, TextField } from "@material-ui/core";
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridValueFormatterParams,
	GridValueGetterParams,
} from "@material-ui/data-grid";
import { FC, useContext, useEffect, useState } from "react";
import { DateRangeSelectWidget } from "../../../../components/daterange-select";
import Loading from "../../../../components/loading";
import { FDateCustom, FDouble, Period } from "../../../../lib/common";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { Inventory } from "../../../../lib/models-inventory";

interface IProps {}

const Report: FC<IProps> = () => {
	const req = useRequest();

	const [period, setPeriod] = useState<Period>(
		new Period(undefined, undefined, "month")
	);

	const [pageSize, setPageSize] = useState<number>(10);
	return (
		<>
			<div>
				<DateRangeSelectWidget
					title="Select Period"
					period={period}
					onSelectionConfirmed={(value) => setPeriod(value)}
				/>
			</div>
		</>
	);
};

export default Report;

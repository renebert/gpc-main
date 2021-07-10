import { FC, useContext, useEffect, useRef, useState } from "react";
import { Warehouse, WarehouseOrder } from "../../../../lib/models-inventory";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../../lib/pageStateContext";
import { Box, FormControl, FormLabel } from "@material-ui/core";
import { NotificationContext } from "../../../../lib/notifications";
import { FDateCustom } from "../../../../lib/common";
import { WarehouseSelect } from "../../../../components/data-select/warehouse-select";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "25ch",
			},
		},
		accountNo: {
			display: "inline-block",
			width: 400,
		},
	})
);

interface IProps {
	onSubmit: (data: WarehouseOrder) => void;
	data: WarehouseOrder;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const [docDate, setDocDate] = useState(data.docDate);
	const [orNo, setORNo] = useState(data.orNo);
	const [description, setDescription] = useState(data.description);
	const [toWarehouse, setToWarehouse] = useState<Warehouse | undefined>(
		data.toWarehouse
	);
	const [amount, setAmount] = useState(data.amount);
	const [remarks, setRemarks] = useState(data.remarks);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({
		key: "create-warehouseOrder-form-setExecSubmit",
		dispatch: setExecSubmit,
	});

	const getData = () => {
		return {
			...data,
			docDate: docDate,
			orNo: orNo,
			description: description,
			toWarehouseId: toWarehouse?.id ?? 0,
			amount: amount,
			remarks: remarks,
		};
	};

	const getErrors = () => {
		const ret: string[] = [];

		if (toWarehouse?.id == data.warehouseId)
			ret.push(
				'Selected "To Warehouse" is the same was the supplying warehouse. A warehouse cannot purchase from itself'
			);

		return ret;
	};

	const handleSubmit = (e?: React.SyntheticEvent) => {
		e?.preventDefault();

		const isValid = formRef.current?.reportValidity();
		if (isValid) {
			const errors = getErrors();
			if (errors.length > 0) {
				nc.snackbar.show(errors, "error");
			} else {
				const newData = getData();
				onSubmit(newData);
			}
		}
	};

	useEffect(() => {
		if (execSubmit) handleSubmit();
	}, [execSubmit]);

	return (
		<>
			<form
				ref={formRef}
				className={classes.root}
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<FormControl>
					<FormLabel>Record Id</FormLabel>
					<b>{data.id == 0 ? "[New Record]" : data.id}</b>
				</FormControl>
				<TextField
					label="Date"
					type="date"
					required
					value={FDateCustom(docDate, "YYYY-MM-DD")}
					onChange={(e) => setDocDate(new Date(e.target.value))}
				/>
				<TextField
					label="OR No."
					required
					value={orNo}
					onChange={(e) => setORNo(e.target.value)}
				/>
				<TextField
					label="Description"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Box className={classes.accountNo}>
					<WarehouseSelect
						inputLabel="To Warehouse"
						value={toWarehouse}
						onChange={(value) => setToWarehouse(value)}
					/>
				</Box>
				<TextField
					label="Remarks"
					multiline
					value={remarks}
					onChange={(e) => setRemarks(e.target.value)}
				/>
			</form>
		</>
	);
};

export default Form;

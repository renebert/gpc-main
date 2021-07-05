import { FC, useContext, useEffect, useRef, useState } from "react";
import { Delivery } from "../../../../lib/models-inventory";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../../lib/pageStateContext";
import { FormControl, FormLabel } from "@material-ui/core";
import { NotificationContext } from "../../../../lib/notifications";
import { FDateCustom } from "../../../../lib/common";
import { RenderAmount } from "../../../../components/render-fields";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "25ch",
			},
		},
	})
);

interface IProps {
	onSubmit: (data: Delivery) => void;
	data: Delivery;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const [docDate, setDocDate] = useState(data.docDate);
	const [description, setDescription] = useState(data.description);
	const [poNo, setPONo] = useState(data.poNo);
	const [drNo, setDRNo] = useState(data.drNo);
	const [supplier, setSupplier] = useState(data.supplier);
	const [amount, setAmount] = useState(data.amount);
	const [remarks, setRemarks] = useState(data.remarks);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({
		key: "create-delivery-form-setExecSubmit",
		dispatch: setExecSubmit,
	});

	const getData = () => {
		return {
			...data,
			docDate: docDate,
			description: description,
			poNo: poNo,
			drNo: drNo,
			supplier: supplier,
			amount: amount,
			remarks: remarks,
		};
	};

	const getErrors = () => {
		const ret: string[] = [];

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
					label="Description"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<TextField
					label="PO No."
					value={poNo}
					onChange={(e) => setPONo(e.target.value)}
				/>
				<TextField
					label="DR No."
					value={drNo}
					onChange={(e) => setDRNo(e.target.value)}
				/>
				<TextField
					label="Supplier"
					required
					value={supplier}
					onChange={(e) => setSupplier(e.target.value)}
				/>
				<RenderAmount
					value={amount}
					onFinalChange={(value) => setAmount(value)}
					tfProps={{
						label: "Amount",
						required: true,
						inputProps: { style: { textAlign: "right" } },
					}}
				/>
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

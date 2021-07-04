import { FC, useContext, useEffect, useRef, useState } from "react";
import { Category, Stock, Unit } from "../../../../lib/models-inventory";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../../lib/pageStateContext";
import { FormControl, FormLabel } from "@material-ui/core";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { NotificationContext } from "../../../../lib/notifications";
import { UnitSelect } from "../../../../components/data-select/unit-select";
import { CategorySelect } from "../../../../components/data-select/category-select";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "25ch",
			},
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	})
);

interface IProps {
	onSubmit: (data: Stock) => void;
	data?: Stock;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const d = data ?? new Stock();
	const [stockName, setStockName] = useState(d.stockName);
	const [description, setDescription] = useState(d.description);

	const [unit, setUnit] = useState<Unit | undefined>(d.unit ?? undefined);
	const [category, setCategory] = useState<Category | undefined>(
		d.category ?? undefined
	);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({ key: "create-stock-form-setExecSubmit", dispatch: setExecSubmit });

	const getData = () => {
		return {
			...d,
			stockName: stockName,
			description: description,
			unitId: unit?.id ?? 0,
			categoryId: category?.id ?? 0,
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
					<b>{d.id == 0 ? "[New Record]" : d.id}</b>
				</FormControl>
				<TextField
					label="Stock Name"
					required
					value={stockName}
					onChange={(e) => setStockName(e.target.value)}
				/>
				<TextField
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<FormControl className={classes.formControl}>
					<UnitSelect value={unit} onChange={(value) => setUnit(value)} />
				</FormControl>
				<FormControl className={classes.formControl}>
					<CategorySelect
						value={category}
						onChange={(value) => setCategory(value)}
					/>
				</FormControl>
			</form>
		</>
	);
};

export default Form;

import { FC, useContext, useEffect, useRef, useState } from "react";
import { Category, Stock, Unit } from "../../../../lib/models-inventory";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../../lib/pageStateContext";
import { FormControl, FormLabel } from "@material-ui/core";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import NCProcBox from "../../../../components/notifications/procbox";
import { NotificationContext } from "../../../../lib/notifications";
import { Autocomplete } from "@material-ui/lab";

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

	const [unit, setUnit] = useState<Unit | null>(d.unit ?? null);
	const [unitText, setUnitText] = useState("");

	const [category, setCategory] = useState<Category | null>(d.category ?? null);
	const [categoryText, setCategoryText] = useState("");

	const [units, setUnits] = useState<Unit[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({ key: "create-stock-form-setExecSubmit", dispatch: setExecSubmit });

	const getUnits = async () => {
		const res = await req.get(`${g.API_URL}/inventory/unit/list`);
		if (res.success) setUnits(res.data);
	};

	const getCategories = async () => {
		const res = await req.get(`${g.API_URL}/inventory/category/list`);
		if (res.success) setCategories(res.data);
	};

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
		getUnits();
		getCategories();
	}, []);

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
					<Autocomplete
						value={unit}
						onChange={(event, newValue) => setUnit(newValue)}
						inputValue={unitText}
						onInputChange={(event, newValue) => setUnitText(newValue)}
						options={units}
						getOptionLabel={(option) => option.unit}
						renderInput={(params) => (
							<TextField {...params} label="Unit" required />
						)}
					/>
				</FormControl>
				<FormControl className={classes.formControl}>
					<Autocomplete
						value={category}
						onChange={(event, newValue) => setCategory(newValue)}
						inputValue={categoryText}
						onInputChange={(event, newValue) => setCategoryText(newValue)}
						options={categories}
						getOptionLabel={(option) => option.category}
						renderInput={(params) => (
							<TextField {...params} label="Category" required />
						)}
					/>
				</FormControl>
			</form>
		</>
	);
};

export default Form;

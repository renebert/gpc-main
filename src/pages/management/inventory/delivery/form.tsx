import { FC, useContext, useEffect, useRef, useState } from "react";
import { Delivery } from "../../../../lib/models-inventory";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../../lib/pageStateContext";
import { FormControl, FormLabel } from "@material-ui/core";
import { NotificationContext } from "../../../../lib/notifications";

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
	data?: Delivery;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const d = data ?? new Delivery();
	const [description, setDescription] = useState(d.description);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({
		key: "create-delivery-form-setExecSubmit",
		dispatch: setExecSubmit,
	});

	const getData = () => {
		return { ...d, description: description };
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
					label="Delivery"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</form>
		</>
	);
};

export default Form;

import { FC, useContext, useEffect, useRef, useState } from "react";
import { Warehouse } from "../../../../lib/models-inventory";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../../lib/pageStateContext";
import { Box, FormControl, FormLabel, Grid } from "@material-ui/core";
import { AccountSelect } from "../../../../components/data-select/account-select";
import { GPCAccount } from "../../../../lib/models";
import { NotificationContext } from "../../../../lib/notifications";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				marginBottom: 20,
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
	onSubmit: (data: Warehouse) => void;
	data?: Warehouse;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const d = data ?? new Warehouse();
	const [warehouse, setWarehouse] = useState(d.warehouse);
	const [account, setAccount] = useState<GPCAccount | undefined>(d.account);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({
		key: "create-warehouse-form-setExecSubmit",
		dispatch: setExecSubmit,
	});

	const getData = () => {
		return {
			...d,
			warehouse: warehouse,
			accountNo: account?.accountNo ?? "",
			account: account,
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
					label="Warehouse"
					required
					value={warehouse}
					onChange={(e) => setWarehouse(e.target.value)}
				/>
				<Box className={classes.accountNo}>
					<AccountSelect
						value={account}
						onChange={(value) => setAccount(value)}
					/>
				</Box>
			</form>
		</>
	);
};

export default Form;

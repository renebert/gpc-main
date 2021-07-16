import { FC, useContext, useEffect, useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
	FormControl,
	FormLabel,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core";
import { GPCAccount } from "../../../lib/models";
import { useRequest } from "../../../lib/hooks";
import { NotificationContext } from "../../../lib/notifications";
import PageStateContext from "../../../lib/pageStateContext";
import { UplineSelect } from "../online-applications/account-requests/view";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "25ch",
			},
		},
		accountSelect: {
			display: "inline-block",
			width: "400px",
		},
	})
);

interface IProps {
	onSubmit: (data: GPCAccount) => void;
	data?: GPCAccount;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const d = data ?? new GPCAccount();

	const [uplineAccount, setUplineAccount] = useState<GPCAccount | undefined>(
		d.upline ?? undefined
	);
	const [noUpline, setNoUpline] = useState(false);
	const [uplineName, setUplineName] = useState("");

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({ key: "create-account-form-setExecSubmit", dispatch: setExecSubmit });

	const getData = () => {
		return {
			...d,
			uplineAccountNo: uplineAccount?.accountNo,
		};
	};

	const getErrors = () => {
		const ret: string[] = [];

		if (!uplineAccount?.accountNo && !noUpline)
			ret.push("Please select upline");

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
				<TextField label="Name" disabled value={d.profile.name} />
				<TextField label="Account No." disabled value={d.accountNo} />

				<div className={classes.accountSelect}>
					<UplineSelect
						uplineAccount={uplineAccount}
						setUplineAccount={setUplineAccount}
						uplineName={uplineName}
						setUplineName={setUplineName}
						noUpline={noUpline}
						setNoUpline={setNoUpline}
					/>
				</div>
			</form>
		</>
	);
};

export default Form;

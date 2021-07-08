import { FC, useContext, useEffect, useRef, useState } from "react";
import { UplineClaim } from "../../../lib/models";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../lib/pageStateContext";
import { FormControl, FormLabel } from "@material-ui/core";
import { NotificationContext } from "../../../lib/notifications";

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
	onSubmit: (data: UplineClaim) => void;
	data?: UplineClaim;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const d = data ?? new UplineClaim();
	const [lastName, setLastName] = useState(d.lastName);
	const [firstName, setFirstName] = useState(d.firstName);
	const [email, setEmail] = useState(d.email);
	const [accountNo, setAccountNo] = useState(d.accountNo);
	const [nickName, setNickName] = useState(d.nickName);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({
		key: "create-uplineclaim-form-setExecSubmit",
		dispatch: setExecSubmit,
	});

	const getData = () => {
		return {
			...d,
			lastName: lastName,
			firstName: firstName,
			email: email,
			accountNo: accountNo,
			nickName: nickName,
		};
	};

	const getErrors = () => {
		const ret: string[] = [];

		if (
			lastName.trim() == "" &&
			firstName.trim() == "" &&
			nickName.trim() == "" &&
			email.trim() == "" &&
			accountNo.trim() == ""
		)
			ret.push("Please provide at least one (1) information");

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
					label="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<TextField
					label="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<TextField
					label="Nickname"
					value={nickName}
					onChange={(e) => setNickName(e.target.value)}
				/>
				<TextField
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label="Account No."
					value={accountNo}
					onChange={(e) => setAccountNo(e.target.value)}
				/>
			</form>
		</>
	);
};

export default Form;

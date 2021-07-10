import { FC, useContext, useEffect, useRef, useState } from "react";
import { Profile } from "../../../lib/models";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PageStateContext from "../../../lib/pageStateContext";
import {
	Divider,
	FormControl,
	FormLabel,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core";
import { NotificationContext } from "../../../lib/notifications";
import { FDateCustom } from "../../../lib/common";
import { useGlobal } from "../../../lib/hooks";
import { AddressSelectWidget } from "../../data-select/address-select";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *:not(.MuiDivider-root)": {
				margin: theme.spacing(1),
				width: "25ch",
			},
			"& .MuiDivider-root": {
				backgroundColor: "initial",
			},
		},
	})
);

interface IProps {
	onSubmit: (data: Profile) => void;
	data?: Profile;
}

const Form: FC<IProps> = ({ data, onSubmit }) => {
	const g = useGlobal();
	const nc = useContext(NotificationContext);

	const classes = useStyles();
	const formRef = useRef<HTMLFormElement>(null);

	const d = data ?? new Profile();
	const [lastName, setLastName] = useState(d.lastName);
	const [firstName, setFirstName] = useState(d.firstName);
	const [middleName, setMiddleName] = useState(d.middleName);
	const [nameExt, setNameExt] = useState(d.nameExt);
	const [nickName, setNickname] = useState(d.nickName);
	const [dob, setDOB] = useState(d.dob);
	const [homeAddress, setHomeAddress] = useState(d.home_Address);
	const [homeBrgyId, setHomeBrgyId] = useState(d.home_BrgyId);
	const [email, setEmail] = useState(d.email);
	const [mobileNo, setMobileNo] = useState(d.mobileNo);
	const [gender, setGender] = useState(d.gender);
	const [civilStatus, setCivilStatus] = useState(d.civilStatus);

	const [execSubmit, setExecSubmit] = useState<Date | null>(null);

	const ps = useContext(PageStateContext);
	ps.Add({
		key: "common-profile-form-setExecSubmit",
		dispatch: setExecSubmit,
	});

	const getData = () => {
		return {
			...d,
			lastName: lastName,
			firstName: firstName,
			middleName: middleName,
			nameExt: nameExt,
			nickName: nickName,
			dob: dob,
			home_Address: homeAddress,
			home_BrgyId: homeBrgyId,
			email: email,
			mobileNo: mobileNo,
			gender: gender,
			civilStatus: civilStatus,
		};
	};

	const getErrors = () => {
		const ret: string[] = [];

		if (homeBrgyId <= 0) ret.push("Home Address is required");

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
				<br />
				<TextField
					label="Last Name"
					required
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<TextField
					label="First Name"
					required
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<TextField
					label="Middle Name"
					value={middleName}
					onChange={(e) => setMiddleName(e.target.value)}
				/>
				<TextField
					label="Name Ext."
					value={nameExt}
					placeholder="Jr., Sr., II, III, etc."
					onChange={(e) => setNameExt(e.target.value)}
				/>
				<TextField
					label="Nickname"
					value={nickName}
					onChange={(e) => setNickname(e.target.value)}
				/>
				<Divider />
				<TextField
					label="Date of Birth"
					type="date"
					value={FDateCustom(dob, "YYYY-MM-DD")}
					onChange={(e) => setDOB(new Date(e.target.value))}
				/>

				<FormControl>
					<InputLabel>Gender</InputLabel>
					<Select
						value={gender}
						onChange={(e) => setGender(Number(e.target.value))}
					>
						{g.Settings.enum_Genders.map((x) => (
							<MenuItem key={x.value} value={x.value}>
								{x.description}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel>Civil Status</InputLabel>
					<Select
						value={civilStatus}
						onChange={(e) => setCivilStatus(Number(e.target.value))}
					>
						{g.Settings.enum_CivilStatus.map((x) => (
							<MenuItem key={x.value} value={x.value}>
								{x.description}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<br />
				<Divider />
				<AddressSelectWidget
					prefix="Home"
					dbAddress={homeAddress}
					dbBrgyId={homeBrgyId}
					streetRequired={true}
					onSelectionConfirmed={(brgyId, address, addressStr) => {
						setHomeBrgyId(brgyId);
						setHomeAddress(address);
					}}
				/>
				<TextField
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label="Mobile No."
					value={mobileNo}
					onChange={(e) => setMobileNo(e.target.value)}
				/>
			</form>
		</>
	);
};

export default Form;

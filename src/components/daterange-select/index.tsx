import { FC, useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FPeriod, Period } from "../../lib/common";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@material-ui/core";
import { StyledViewField, useClickableStyle } from "../styled";
import { NotificationContext } from "../../lib/notifications";
import { DateRange, DateRangePicker } from "materialui-daterange-picker";

interface IDateRangeProps {
	onChange: (value: Period) => void;
	period: Period;
}

const DateRangeElement: FC<IDateRangeProps> = ({ onChange, period }) => {
	const [open, setOpen] = useState(true);
	const toggle = () => setOpen(!open);

	return (
		<>
			<DateRangePicker
				open={open}
				toggle={toggle}
				initialDateRange={period}
				closeOnClickOutside={false}
				onChange={(range) => {
					onChange(new Period(range.startDate, range.endDate));
				}}
			/>
		</>
	);
};

interface IDateRangeSelectDialogProps extends IDateRangeWidgetWidgetProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DateRangeSelectDialog: FC<IDateRangeSelectDialogProps> = ({
	title,
	period,
	onSelectionConfirmed,
	open,
	setOpen,
}) => {
	const nc = useContext(NotificationContext);

	const [newPeriod, setNewPeriod] = useState<Period | null>(null);
	const handleClose = () => setOpen(false);

	const validate = () => {
		let ret: string[] = [];

		if (!newPeriod?.IsValid) ret.push("Invalid period");

		return ret;
	};

	const handleApply = () => {
		const errors = validate();
		if (errors.length > 0) {
			nc.snackbar.show(errors, "warning");
			return;
		}

		newPeriod && onSelectionConfirmed(newPeriod);
		setOpen(false);
	};

	return (
		<>
			<Dialog
				onClose={handleClose}
				open={open}
				disableBackdropClick
				disableEscapeKeyDown
				maxWidth="lg"
			>
				<DialogTitle>{`${title}`}</DialogTitle>
				<DialogContent>
					<div style={{ width: "720px" }}>
						<DateRangeElement
							period={period}
							onChange={(value) => setNewPeriod(value)}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="default">
						Cancel
					</Button>
					<Button onClick={handleApply} variant="contained" color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

interface IDateRangeWidgetWidgetProps {
	title: string;
	period: Period;
	onSelectionConfirmed: (value: Period) => void;
}

export const DateRangeSelectWidget: FC<IDateRangeWidgetWidgetProps> = ({
	title,
	period,
	onSelectionConfirmed,
}) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				display: "inline-block",
				cursor: "pointer",
				padding: "8px",
				"& *": {
					cursor: "pointer !important",
					color: "black !important",
				},
				"&:hover": {
					color: "gray",
				},
			},
		})
	);

	const classes = useStyles();
	const clickable = useClickableStyle();
	const [open, setOpen] = useState(false);
	const [p, setP] = useState<Period>(period);
	const [disp, setDisp] = useState("");

	const handleClick = () => {
		setOpen(true);
	};

	const updateDisp = (value: Period) => {
		const s = FPeriod(value.startDate, value.endDate);
		setDisp(s);
	};

	useEffect(() => {
		updateDisp(p);
	}, [p]);

	return (
		<>
			<div onClick={handleClick}>
				<TextField
					className={`${classes.root} ${clickable.root}`}
					disabled
					label={title}
					value={disp}
				/>
			</div>
			<DateRangeSelectDialog
				title={title}
				period={p}
				onSelectionConfirmed={(value) => {
					setP(value);
					onSelectionConfirmed(value);
				}}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
};

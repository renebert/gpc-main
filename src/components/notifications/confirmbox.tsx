import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogContentText } from "@material-ui/core";

export interface IConfirmProps {
	message: string | string[];
	open: boolean;
	title?: string;
	okText?: string;
	cancelText?: String;
	onClose?: (confirmed: boolean) => void;
}

export const DefaultConfirmProps: IConfirmProps = {
	message: "",
	open: false,
	title: "Please confirm...",
	okText: "Yes",
	cancelText: "No",
};

const NCConfirmBox: FC<IConfirmProps> = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={(e) => props.onClose && props.onClose(false)}
			disableBackdropClick
			disableEscapeKeyDown
		>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{Array.isArray(props.message) ? (
						props.message.map((msg) => <div>{msg}</div>)
					) : (
						<span>{props.message}</span>
					)}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={(e) => props.onClose && props.onClose(false)}
					variant="contained"
					color="default"
				>
					{props.cancelText}
				</Button>
				<Button
					onClick={(e) => props.onClose && props.onClose(true)}
					variant="contained"
					color="primary"
					autoFocus
				>
					{props.okText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NCConfirmBox;

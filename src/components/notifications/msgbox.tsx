import { FC } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

export interface IMsgProps {
	message: string | string[];
	open: boolean;
	title?: string;
	okText?: string;
	onClose?: () => void;
}

export const DefaultMsgProps: IMsgProps = {
	message: "",
	open: false,
	title: "Application Message",
	okText: "Ok",
	onClose: undefined,
};

const NCMsgBox: FC<IMsgProps> = (props) => {
	return (
		<Dialog onClose={props.onClose} open={props.open}>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				{Array.isArray(props.message) ? (
					props.message.map((msg) => <div>{msg}</div>)
				) : (
					<span>{props.message}</span>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={(e) => props.onClose && props.onClose()}
					variant="contained"
					color="primary"
				>
					{props.okText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NCMsgBox;

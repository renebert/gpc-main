import React, { FC } from "react";
import { Snackbar, SnackbarOrigin } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";

export interface ISbProps {
	open: boolean;
	message: string | string[];
	autoHideDuration?: number;
	severity?: Color;
	anchorOrigin?: SnackbarOrigin;
	key?: string;
	onClose?: (event?: React.SyntheticEvent, reason?: string) => void;
}

export const DefaultSbProps: ISbProps = {
	open: false,
	message: "",
	autoHideDuration: 6000,
	severity: "success",
	anchorOrigin: {
		vertical: "top",
		horizontal: "center",
	},
	key: "topcenter",
};

const NCSnackbar: FC<ISbProps> = (props) => {
	return (
		<Snackbar {...props}>
			<Alert onClose={props.onClose} severity={props.severity}>
				{Array.isArray(props.message) ? (
					props.message.map((msg) => <div>{msg}</div>)
				) : (
					<span>{props.message}</span>
				)}
			</Alert>
		</Snackbar>
	);
};

export default NCSnackbar;

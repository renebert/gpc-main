import React from "react";
// import { IConfirmProps } from "../components/notifications/confirmbox";
// import { IMsgProps } from "../components/notifications/msgbox";
// import { IProcProps } from "../components/notifications/procbox";
import { ISbProps } from "../components/notifications/snackbar";
import { SnackbarOrigin } from "@material-ui/core";
import { Color } from "@material-ui/lab";

// export type MsgState = [
// 	IMsgProps,
// 	React.Dispatch<React.SetStateAction<IMsgProps>>
// ];
// export type ConfirmState = [
// 	IConfirmProps,
// 	React.Dispatch<React.SetStateAction<IConfirmProps>>
// ];
// export type ProcState = [
// 	IProcProps,
// 	React.Dispatch<React.SetStateAction<IProcProps>>
// ];
export type SnackbarState = [
	ISbProps,
	React.Dispatch<React.SetStateAction<ISbProps>>
];

// export class MsgUI {
// 	constructor(
// 		st?: [IMsgProps, React.Dispatch<React.SetStateAction<IMsgProps>>]
// 	) {
// 		this.st = st;
// 	}
// 	st?: [IMsgProps, React.Dispatch<React.SetStateAction<IMsgProps>>];
// 	show = (message: string | string[], title?: string, okText?: string) => {
// 		return new Promise<void>((resolved) => {
// 			if (!this.st) throw new Error("MsgUI state is null");
// 			const [state, setState] = this.st;

// 			let tmp = {
// 				...state,
// 				open: true,
// 				message: message,
// 				onClose: (e: React.MouseEvent) => {
// 					if (e.currentTarget.nodeName === "DIV") return false;

// 					setState({
// 						...state,
// 						open: false,
// 					});

// 					return resolved();
// 				},
// 			};
// 			if (title) tmp.title = title;
// 			if (okText) tmp.okText = okText;
// 			setState(tmp);
// 		});
// 	};
// }

// export class ConfirmUI {
// 	constructor(
// 		st?: [IConfirmProps, React.Dispatch<React.SetStateAction<IConfirmProps>>]
// 	) {
// 		this.st = st;
// 	}
// 	st?: [IConfirmProps, React.Dispatch<React.SetStateAction<IConfirmProps>>];
// 	show = (
// 		message: string | string[],
// 		title?: string,
// 		okText?: string,
// 		cancelText?: String
// 	) => {
// 		return new Promise<boolean>((resolved) => {
// 			if (!this.st) throw new Error("ConfirmUI state is null");
// 			const [state, setState] = this.st;

// 			let tmp = {
// 				...state,
// 				open: true,
// 				message: message,
// 				onClose: (e: React.MouseEvent, confirmed: boolean) => {
// 					if (e.currentTarget.nodeName === "DIV") return false;

// 					setState({
// 						...state,
// 						open: false,
// 					});

// 					return resolved(confirmed == true);
// 				},
// 			};
// 			if (title) tmp.title = title;
// 			if (okText) tmp.okText = okText;
// 			if (cancelText) tmp.cancelText = cancelText;
// 			setState(tmp);
// 		});
// 	};
// }

// export class ProcUI {
// 	constructor(
// 		st?: [IProcProps, React.Dispatch<React.SetStateAction<IProcProps>>]
// 	) {
// 		this.st = st;
// 	}
// 	st?: [IProcProps, React.Dispatch<React.SetStateAction<IProcProps>>];
// 	show = () => {
// 		if (!this.st) throw new Error("ProcUI state is null");
// 		const [state, setState] = this.st;

// 		let tmp = {
// 			...state,
// 			open: true,
// 			onClose: (e: React.MouseEvent) => {
// 				if (e.currentTarget.nodeName === "DIV") return false;

// 				setState({
// 					...state,
// 					open: false,
// 				});
// 			},
// 		};
// 		setState(tmp);
// 	};
// 	hide = () => {
// 		if (!this.st) throw new Error("ProcUI state is null");
// 		const [state, setState] = this.st;

// 		setState({
// 			...state,
// 			open: false,
// 		});
// 	};
// }

export class SnackbarUI {
	constructor(st?: [ISbProps, React.Dispatch<React.SetStateAction<ISbProps>>]) {
		this.st = st;
	}
	st?: [ISbProps, React.Dispatch<React.SetStateAction<ISbProps>>];
	show = (
		message: string | string[],
		severity?: Color,
		autoHideDuration?: number,
		anchorOrigin?: SnackbarOrigin,
		key?: string,
		onClose?: (event?: React.SyntheticEvent, reason?: string) => void
	) => {
		if (!this.st) throw new Error("SnackbarUI state is null");
		const [state, setState] = this.st;

		let tmp = {
			...state,
			open: true,
			message: message,
			onClose: (event?: React.SyntheticEvent, reason?: string) => {
				setState({
					...state,
					open: false,
				});

				onClose && onClose(event, reason);
			},
		};
		if (autoHideDuration) tmp.autoHideDuration = autoHideDuration;
		if (severity) tmp.severity = severity;
		if (anchorOrigin) tmp.anchorOrigin = anchorOrigin;
		if (key) tmp.key = key;
		setState(tmp);
	};
}

export class Notification {
	constructor(
		// mb?: [IMsgProps, React.Dispatch<React.SetStateAction<IMsgProps>>],
		// cb?: [IConfirmProps, React.Dispatch<React.SetStateAction<IConfirmProps>>],
		// pb?: [IProcProps, React.Dispatch<React.SetStateAction<IProcProps>>],
		sb?: [ISbProps, React.Dispatch<React.SetStateAction<ISbProps>>]
	) {
		// this.msgbox = new MsgUI(mb);
		// this.confirmbox = new ConfirmUI(cb);
		// this.processing = new ProcUI(pb);
		this.snackbar = new SnackbarUI(sb);
	}
	// msgbox;
	// confirmbox;
	// processing;
	snackbar;
}

export const NotificationContext = React.createContext(new Notification());

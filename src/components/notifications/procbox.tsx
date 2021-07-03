import React, { FC } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

export interface IProcProps {
	open: boolean;
	onClose?: (e: React.MouseEvent) => void;
}

export const DefaultProcProps: IProcProps = {
	open: false,
};

const NCProcBox: FC<IProcProps> = (props) => {
	return (
		<Backdrop id="backdrop" open={props.open} onClick={props.onClose}>
			<CircularProgress color="primary" />
		</Backdrop>
	);
};

export default NCProcBox;

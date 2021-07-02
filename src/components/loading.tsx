import { FC } from "react";
import loadingIcon from "../assets/loading.gif";

interface IProps {
	text?: string;
}

const Loading: FC<IProps> = ({ text }) => {
	return (
		<div>
			<img src={loadingIcon} /> {text}
		</div>
	);
};

Loading.defaultProps = {
	text: "Loading...",
};

export default Loading;

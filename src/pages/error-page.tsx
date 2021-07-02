import React from "react";
import { Link } from "react-router-dom";

interface IProps {
	title?: string;
	subtitle?: string;
	description?: string;
	navigation?: {
		path: string;
		text: string;
	};
}
const ErrorPage: React.FC<IProps> = ({
	title,
	subtitle,
	description,
	navigation,
}) => {
	return (
		<>
			<div>{title}</div>
			<div>{subtitle}</div>
			<div>{description}</div>
			{navigation && <Link to={navigation.path}>{navigation.text}</Link>}
		</>
	);
};

export default ErrorPage;

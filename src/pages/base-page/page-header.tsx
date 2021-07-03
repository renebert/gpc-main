import { FC } from "react";

interface IProps {
	prev: Array<{
		text: string;
		link: string;
	}>;
	title: string;
	wcText?: string;
}

const PageHeader: FC<IProps> = ({ prev, title, wcText }) => {
	return (
		<>
			<h3>{title}</h3>
			<small>{wcText}</small>
		</>
	);
};

export default PageHeader;

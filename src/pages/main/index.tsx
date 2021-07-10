import { FC } from "react";
import { useGlobal } from "../../lib/hooks";

const Main: FC = () => {
	const g = useGlobal();

	return (
		<>
			<h3>{`Hello ${g.Name}, welcome to ${process.env.REACT_APP_COMPANY_NAME}`}</h3>
			<hr />
			<br />
			[Your dash board goes here...]
		</>
	);
};

export default Main;

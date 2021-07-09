import { FC } from "react";
import { GPCAccount } from "../../../lib/models";
import GPCAccountView from "../../../components/common/account/view";

interface IProps {
	data?: GPCAccount;
}

const View: FC<IProps> = ({ data }) => {
	if (data) {
		const comp1 = JSON.stringify(data);
		const comp2 = JSON.stringify(new GPCAccount());

		if (comp1 == comp2) {
			return (
				<>
					<h3>
						You have no account yet, please make a request to create an account
						for you and wait for the approval of your request
					</h3>
					<p>
						(Click on "Account Requests" link above to view or create a request)
					</p>
				</>
			);
		}
	}

	return (
		<>
			<h4>View Account</h4>

			<GPCAccountView data={data} />
		</>
	);
};

export default View;

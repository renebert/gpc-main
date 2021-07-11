import React from "react";
import { ActiveComponentType } from ".";
import { PageStateManager } from "../../lib/pageStateContext";
import { Alert } from "@material-ui/lab";

export const NoAccountMessage = (ps: PageStateManager) => {
	return (
		<>
			<h3>
				You have no account yet, please make a request to create an account and
				wait for the approval of your request.
			</h3>

			<Alert severity="warning">
				Important: Before you create a request, please update your profile first
				so the management could get more information about you.
			</Alert>
			<ol>
				<li>
					Go to &nbsp;
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							(
								ps.Get("base-active-component")?.dispatch as React.Dispatch<
									React.SetStateAction<ActiveComponentType>
								>
							)("my-landing");
						}}
					>
						"My"
					</a>
					&nbsp; menu item and select "Profile" to update your personal
					information
				</li>
				<li>
					After updating your profile, select "Upline Claim" to provide
					information about your upline
				</li>
				<li>And finally, select "Account Requests" to create a request)</li>
			</ol>
		</>
	);
};

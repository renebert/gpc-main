import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { FC, useContext, useEffect, useState } from "react";
import PageCommands from "../../../components/page-commands";
import { GPCAccount } from "../../../lib/models";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { NotificationContext } from "../../../lib/notifications";
import { StyledViewField, StyledViewPage } from "../../../components/styled";
import { FDateTime } from "../../../lib/common";

interface IProps {
	data?: GPCAccount;
}

const View: FC<IProps> = ({ data }) => {
	if (!data) return <div>No data found</div>;

	return (
		<>
			<h4>View Account</h4>

			<StyledViewPage>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Account No.:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.accountNo}</StyledViewField>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={2}>
						<Box textAlign="right" fontWeight="bold">
							Upline:
						</Box>
					</Grid>
					<Grid item sm={10}>
						<StyledViewField>{data.upline?.name}</StyledViewField>
						<small>{data.uplineAccountNo}</small>
					</Grid>
				</Grid>
			</StyledViewPage>
		</>
	);
};

export default View;

import {
	Box,
	Button,
	Checkbox,
	createStyles,
	Divider,
	FormControlLabel,
	Grid,
	makeStyles,
	TextField,
	Theme,
} from "@material-ui/core";
import { FC, useContext, useState } from "react";
import PageCommands from "../../../../components/page-commands";
import { GPCAccount, GPCAccountRequest } from "../../../../lib/models";
import PageStateContext, {
	PageModeType,
} from "../../../../lib/pageStateContext";
import { useGlobal, useRequest } from "../../../../lib/hooks";
import { NotificationContext } from "../../../../lib/notifications";
import { StyledViewField, StyledViewPage } from "../../../../components/styled";
import { FDate, FDateTime } from "../../../../lib/common";
import { AccountSelect } from "../../../../components/data-select/account-select";
import Loading from "../../../../components/loading";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		address: {
			width: "100%",
		},
	})
);

interface IProps {
	dataRequest?: GPCAccountRequest;
}

const View: FC<IProps> = ({ dataRequest }) => {
	const classes = useStyles();

	const g = useGlobal();
	const req = useRequest();
	const nc = useContext(NotificationContext);

	const ps = useContext(PageStateContext);

	const [data, setData] = useState<GPCAccountRequest | undefined>(dataRequest);
	const [uplineAccount, setUplineAccount] = useState<GPCAccount | undefined>();
	const [denyMessage, setDenyMessage] = useState("");
	const [noUpline, setNoUpline] = useState(false);
	const [uplineName, setUplineName] = useState("");

	const backToList = () => {
		(
			ps.Get("onlineApplications-account-request-setPageMode")
				?.dispatch as React.Dispatch<React.SetStateAction<PageModeType>>
		)("list");
	};

	const approve = async () => {
		if (!uplineAccount?.accountNo && !noUpline) {
			nc.snackbar.show("Please select this account's upline", "error");
			return;
		}

		const res = await req.post(
			`${g.API_URL}/gpcaccount-request/approve?id=${data?.id}&staffProfileId=${g.Profile.id}&uplineAccountNo=${uplineAccount?.accountNo}&uplineName=${uplineName}&noUpline=${noUpline}`
		);

		if (res.success) {
			setData(res.data);
			nc.snackbar.show("Request was successfully approved");
		}
	};

	const deny = async () => {
		const confirmed = await nc.confirmbox.show(
			"Are you sure you want to deny this request?"
		);

		if (!confirmed) return;

		const res = await req.post(
			`${g.API_URL}/gpcaccount-request/deny?id=${data?.id}&staffProfileId=${g.Profile.id}&message=${denyMessage}`
		);

		if (res.success) {
			setData(res.data);
			nc.snackbar.show("Request was successfully denied");
		}
	};

	return (
		<>
			{data ? (
				<>
					<h4>View Account Request</h4>

					<StyledViewPage>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Id:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.id}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Requested by:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>
									<b>{data.profile.name}</b>
								</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Date Submitted:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{FDate(data.dateSubmitted)}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Status:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>
									<div>{data.statusDesc}</div>
								</StyledViewField>
							</Grid>
						</Grid>
						{data.isApproved && (
							<Grid container spacing={3}>
								<Grid item sm={2}>
									<Box textAlign="right" fontWeight="bold">
										Upline:
									</Box>
								</Grid>
								<Grid item sm={10}>
									<StyledViewField>
										{data.uplineAccountNo ? (
											<>
												<div>{data.uplineName}</div>
												<small>{data.uplineAccountNo}</small>
											</>
										) : (
											"[No upline]"
										)}
									</StyledViewField>
								</Grid>
							</Grid>
						)}
						{data.isDenied && data.denyMessage && (
							<Grid container spacing={3}>
								<Grid item sm={2}>
									<Box textAlign="right" fontWeight="bold">
										Deny Message:
									</Box>
								</Grid>
								<Grid item sm={10}>
									<StyledViewField>
										<div>{data.denyMessage}</div>
									</StyledViewField>
								</Grid>
							</Grid>
						)}
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									By:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>
									{data.isPending ? (
										"Pending action from management"
									) : (
										<>
											<div>{data.statusBy_Name}</div>
											<small>{FDateTime(new Date(data.statusDate))}</small>
										</>
									)}
								</StyledViewField>
							</Grid>
						</Grid>
						{data.isPending && (
							<>
								<Divider />
								<Grid container spacing={3}>
									<Grid item sm={2}>
										<Box textAlign="right" fontWeight="bold">
											Upline:
										</Box>
									</Grid>
									<Grid item sm={10}>
										<AccountSelect
											inputLabel="Select Upline"
											value={uplineAccount}
											onChange={(value) => {
												if (value) {
													setUplineName(value.profile.name);
													setNoUpline(false);
												} else {
													setUplineName("");
													setNoUpline(true);
												}

												setUplineAccount(value);
											}}
										/>
										<FormControlLabel
											control={
												<Checkbox
													checked={noUpline}
													onChange={(event, checked) => {
														setUplineAccount(undefined);
														setNoUpline(checked);
													}}
													color="primary"
												/>
											}
											label="No upline"
										/>
									</Grid>
								</Grid>
								<Divider />
								<Grid container spacing={3}>
									<Grid item sm={2}>
										<Box textAlign="right" fontWeight="bold">
											Deny Message:
										</Box>
									</Grid>
									<Grid item sm={10}>
										<TextField
											multiline
											placeholder="Enter your message here"
											helperText="This message will be saved only when the request is denied"
											className={classes.address}
											value={denyMessage}
											onChange={(e) => setDenyMessage(e.target.value)}
										/>
									</Grid>
								</Grid>
							</>
						)}
					</StyledViewPage>

					<PageCommands>
						<Button variant="contained" color="default" onClick={backToList}>
							Back to list
						</Button>
						{data.isPending && (
							<>
								<Button variant="contained" color="secondary" onClick={deny}>
									Deny
								</Button>
								<Button variant="contained" color="primary" onClick={approve}>
									Approve
								</Button>
							</>
						)}
					</PageCommands>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default View;

import {
	Box,
	Button,
	createStyles,
	Grid,
	makeStyles,
	Theme,
} from "@material-ui/core";
import { FC, useContext, useEffect, useState } from "react";
import PageCommands from "../../../components/page-commands";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { NotificationContext } from "../../../lib/notifications";
import { FDate } from "../../../lib/common";
import { StyledViewField, StyledViewPage } from "../../../components/styled";
import { Profile } from "../../../lib/models";
import Loading from "../../../components/loading";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		picture: {
			position: "absolute",
			right: 50,
			borderRadius: 999,
		},
	})
);

const View: FC = () => {
	const g = useGlobal();
	const req = useRequest();

	const ps = useContext(PageStateContext);
	const classes = useStyles();

	const [data, setData] = useState<Profile | null>(null);

	const getProfile = async () => {
		const res = await req.get(`${g.API_URL}/profile?email=${g.Email}`);
		if (res.success) {
			setData(res.data);
		}
	};

	const edit = () => {
		(
			ps.Get("myprofile-setOpenProps")?.dispatch as React.Dispatch<
				React.SetStateAction<object>
			>
		)({ data: data });

		(
			ps.Get("myprofile-setPageMode")?.dispatch as React.Dispatch<
				React.SetStateAction<PageModeType>
			>
		)("edit");
	};

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<>
			<h4>View Profile</h4>

			{data ? (
				<>
					<StyledViewPage>
						<img className={classes.picture} src={g.Picture} alt={g.Name} />

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
									Name:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.fullname_FN}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Nickname:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.nickName}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Date of Birth:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{FDate(data.dob)}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Age:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.age}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Gender:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.genderStr}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Civil Status:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.civilStatusStr}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Email:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.email}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Mobile No.:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.mobileNo}</StyledViewField>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={2}>
								<Box textAlign="right" fontWeight="bold">
									Home Address:
								</Box>
							</Grid>
							<Grid item sm={10}>
								<StyledViewField>{data.homeAddress}</StyledViewField>
							</Grid>
						</Grid>
					</StyledViewPage>

					<PageCommands>
						<Button variant="contained" color="primary" onClick={edit}>
							Edit
						</Button>
					</PageCommands>
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default View;

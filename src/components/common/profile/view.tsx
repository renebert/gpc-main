import { Box, Grid } from "@material-ui/core";
import { FC } from "react";
import { FDate } from "../../../lib/common";
import { StyledViewField } from "../../styled";
import { Profile } from "../../../lib/models";

interface IProps {
	data: Profile;
}

const View: FC<IProps> = ({ data }) => {
	return (
		<>
			{data ? (
				<>
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
				</>
			) : (
				<div>[No data]</div>
			)}
		</>
	);
};

export default View;

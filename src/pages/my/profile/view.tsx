import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { FC, useContext, useEffect, useState } from "react";
import PageCommands from "../../../components/page-commands";
import PageStateContext, { PageModeType } from "../../../lib/pageStateContext";
import { useGlobal, useRequest } from "../../../lib/hooks";
import { StyledViewPage } from "../../../components/styled";
import { Profile } from "../../../lib/models";
import Loading from "../../../components/loading";
import ProfileView from "../../../components/common/profile/view";

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
		const res = await req.get(
			`${process.env.REACT_APP_API}/profile?email=${g.Email}`
		);
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

						<ProfileView data={data} />
					</StyledViewPage>

					{!g.HasGPCAccount && (
						<PageCommands>
							<Button variant="contained" color="primary" onClick={edit}>
								Edit
							</Button>
						</PageCommands>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default View;

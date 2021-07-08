import { FC } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { useGlobal, useNavigation } from "../../lib/hooks";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 40,
	},
}));

interface IProps {
	className?: string;
}

const AppHeader: FC<IProps> = ({ className, children }) => {
	const { go } = useNavigation();
	const g = useGlobal();

	//const theme = useTheme();
	//const sm = useMediaQuery(theme.breakpoints.up("sm"));

	const classes = useStyles();

	return (
		<>
			<AppBar position="fixed" className={className}>
				<Toolbar>
					{children}
					<IconButton onClick={() => go("my-landing")}>
						<img src={g.Picture} title={g.Name} className={classes.avatar} />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default AppHeader;

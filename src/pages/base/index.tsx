import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect, useState } from "react";
import Header from "../../components/header";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import LayoutContext, { Layout, LayoutElement } from "../../lib/layoutContext";
import { v4 } from "uuid";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
			padding: "80px 10px",
		},
		drawerContainer: {
			overflow: "auto",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		scrollTop: {
			position: "fixed",
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			zIndex: theme.zIndex.drawer + 1,
		},
	})
);

const ScrollTop: FC = (props) => {
	const classes = useStyles();
	const trigger = useScrollTrigger({
		target: window,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector("#back-to-top-anchor");

		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<Zoom in={trigger}>
			<div
				onClick={handleClick}
				role="presentation"
				className={classes.scrollTop}
			>
				{props.children}
			</div>
		</Zoom>
	);
};

const Base: FC = (props) => {
	const ui = useContext(LayoutContext);
	const classes = useStyles();

	const [rsp, setRSP] = useState<Layout | null>(null);

	const key = "base-b";

	useEffect(() => {
		if (!ui.rightSidePanel.HasKey(key)) {
			const b = new LayoutElement(<div>[from base]</div>, key);
			ui.rightSidePanel.Add(b);
		}
	}, []);

	useEffect(() => {
		setRSP(ui.rightSidePanel);
	});

	return (
		<>
			<Header
				componentId="base-header-dropdown"
				appBarClassName={classes.appBar}
			/>
			<CssBaseline />
			<Toolbar id="back-to-top-anchor" />
			<Container maxWidth="xl">
				<>{props.children}</>
			</Container>
			{ui.rightSidePanel.Show && (
				<Drawer
					className={classes.drawer}
					variant="permanent"
					anchor="right"
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					{rsp?.Render()}
				</Drawer>
			)}

			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</>
	);
};

export default withAuthenticationRequired(Base);

import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect, useState } from "react";
import AppHeader from "./app-header";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { useLayout } from "../../lib/hooks";
import { Box } from "@material-ui/core";
import "../../style.scss";
import MenuCreator from "../../components/menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingBottom: 80,
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

interface IBasePageProps {
	header: JSX.Element;
	rightSidePanel?: JSX.Element;
}

const BasePage: FC<IBasePageProps> = ({ header, rightSidePanel, children }) => {
	const { viewport } = useLayout();
	const classes = useStyles();

	const [rspOpen, setRspOpen] = useState(false);

	return (
		<>
			<AppHeader
				componentId="base-header-dropdown"
				appBarClassName={classes.appBar}
				onMobileMenuClick={() => setRspOpen(!rspOpen)}
			/>
			<CssBaseline />
			<Toolbar id="back-to-top-anchor" />
			<Container maxWidth="xl" className={classes.root}>
				<Box textAlign="center">{header}</Box>
				<hr />
				<>{children}</>
			</Container>
			{/* <Drawer
				id="rsp"
				className={classes.drawer}
				variant={viewport.sm ? "permanent" : "temporary"}
				open={rspOpen}
				onClose={() => setRspOpen(false)}
				anchor="right"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<MenuCreator />
				{rightSidePanel}
			</Drawer> */}
			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</>
	);
};

export default withAuthenticationRequired(BasePage);

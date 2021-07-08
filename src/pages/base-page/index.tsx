import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { FC, lazy, useContext, useEffect, useState } from "react";
import AppHeader from "./app-header";
import Drawer from "@material-ui/core/Drawer";
import {
	makeStyles,
	Theme,
	createStyles,
	useTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import "../../style.scss";

import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Menu from "./menu";
import PageStateContext from "../../lib/pageStateContext";

const Main = lazy(() => import("../main"));
const MyLanding = lazy(() => import("../my/landing-page"));
const MyProfile = lazy(() => import("../my/profile"));
const MyUplineClaim = lazy(() => import("../my/upline-claim"));
const MyAccount = lazy(() => import("../my/account"));
const MyAccountRequests = lazy(() => import("../my/account-requests"));

const InventoryLanding = lazy(
	() => import("../management/inventory/landing-page")
);
const DocumentResetLanding = lazy(
	() => import("../management/document-reset/landing-page")
);
const Units = lazy(() => import("../management/inventory/units"));
const Categories = lazy(() => import("../management/inventory/categories"));
const Warehouse = lazy(() => import("../management/inventory/warehouse"));
const Stocks = lazy(() => import("../management/inventory/stocks"));
const DeliveryReset = lazy(
	() => import("../management/document-reset/delivery-reset")
);
const PriceListReset = lazy(
	() => import("../management/document-reset/pricelist-reset")
);
const AccountOrderReset = lazy(
	() => import("../management/document-reset/accountorder-reset")
);
const Delivery = lazy(() => import("../management/inventory/delivery"));
const PriceList = lazy(() => import("../management/inventory/pricelist"));
const AccountOrder = lazy(
	() => import("../management/inventory/account-order")
);

const InventoryReport = lazy(() => import("../management/reports/inventory"));

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			paddingBottom: 80,
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: "none",
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9) + 1,
			},
		},
		toolbar: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
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
		sectionDesktop: {
			display: "none",
			[theme.breakpoints.up("md")]: {
				display: "flex",
			},
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

export type ActiveComponentType =
	| "main"
	| "my-landing"
	| "my-profile"
	| "my-uplineclaim"
	| "my-account-requests"
	| "my-account"
	| "document-reset-landing"
	| "delivery-reset"
	| "pricelist-reset"
	| "accountorder-reset"
	| "inventory-landing"
	| "units"
	| "categories"
	| "warehouse"
	| "stocks"
	| "delivery"
	| "pricelist"
	| "account-order"
	| "warehouse-order"
	| "inventory-report";

interface IBasePageProps {
	header: JSX.Element;
	rightSidePanel?: JSX.Element;
}

const BasePage: FC<IBasePageProps> = ({ header, rightSidePanel, children }) => {
	const ps = useContext(PageStateContext);

	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<ActiveComponentType>("main");

	ps.Add({ key: "base-active-component", dispatch: setActive });

	useEffect(() => {}, [active]);
	return (
		<>
			<a id="back-to-top-anchor" style={{ clear: "both" }} />
			<CssBaseline />
			<div className={classes.root}>
				<AppHeader
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(true)}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{process.env.REACT_APP_NAME}
					</Typography>
					<div className={classes.content}></div>
				</AppHeader>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={() => setOpen(false)}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<Menu
						activate={(component) => {
							setActive(component);
						}}
					/>
				</Drawer>
				<div className={classes.content}>
					<div className={classes.toolbar} />

					{active == "main" && <Main />}
					{active == "my-landing" && <MyLanding />}
					{active == "my-profile" && <MyProfile />}
					{active == "my-uplineclaim" && <MyUplineClaim />}
					{active == "my-account-requests" && <MyAccountRequests />}
					{active == "my-account" && <MyAccount />}

					{active == "document-reset-landing" && <DocumentResetLanding />}
					{active == "delivery-reset" && <DeliveryReset refresh={new Date()} />}
					{active == "pricelist-reset" && (
						<PriceListReset refresh={new Date()} />
					)}
					{active == "accountorder-reset" && (
						<AccountOrderReset refresh={new Date()} />
					)}

					{active == "inventory-landing" && <InventoryLanding />}
					{active == "units" && <Units />}
					{active == "categories" && <Categories />}
					{active == "warehouse" && <Warehouse />}
					{active == "stocks" && <Stocks />}
					{active == "delivery" && <Delivery />}
					{active == "pricelist" && <PriceList />}
					{active == "account-order" && <AccountOrder />}
					{active == "inventory-report" && <InventoryReport />}
				</div>

				<ScrollTop>
					<Fab color="secondary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollTop>
			</div>
		</>
	);
};

export default withAuthenticationRequired(BasePage);

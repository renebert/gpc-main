import {
	Badge,
	createStyles,
	makeStyles,
	Paper,
	Theme,
	withStyles,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { FC } from "react";
import { classicNameResolver } from "typescript";

export const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: "0 4px",
			backgroundColor: "gray",
			color: "white",
		},
	})
)(Badge);

export const ConfirmedBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: "0 4px",
			backgroundColor: "green",
			color: "white",
		},
	})
)(Badge);

export const StyledViewPage: FC = (props) => {
	const useViewPageStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				flexGrow: 1,
			},
			paper: {
				padding: theme.spacing(2),
				color: theme.palette.text.secondary,
				minHeight: 400,
				position: "relative",
			},
		})
	);
	const classes = useViewPageStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>{props.children}</Paper>
		</div>
	);
};

interface IStyledViewFieldProps {
	height?: number;
	maxWidth?: number;
}

export const StyledViewField: FC<IStyledViewFieldProps> = ({
	height,
	maxWidth,
	children,
}) => {
	const useViewPageStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				fontSize: 16,
				padding: "0 2px",
				borderBottom: "2px dotted #e0e0e0",
				height: height ?? "initial",
				maxWidth: maxWidth ?? 300,
				minHeight: 20,
			},
		})
	);
	const classes = useViewPageStyles();

	return <div className={classes.root}>{children}</div>;
};

interface IInlineListProps {
	align?: "left" | "center" | "right";
	wrap?: boolean;
	className?: string;
}

export const InlineList: FC<IInlineListProps> = ({
	align,
	wrap,
	className,
	children,
}) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				textAlign: align,
				whiteSpace: wrap ? "nowrap" : "initial",
				"& > ul": {
					margin: 0,
					paddingInlineStart: 0,
				},
				"& ul ul": {
					padding: "20px",
				},
				"& li": {
					listStyle: "none",
					display: "inline-block",
					verticalAlign: "top",
					margin:
						align == "left"
							? "0 10px 0 0"
							: align == "center"
							? "0 5px 0 5px"
							: "0 0 0 10px",
				},
			},
		})
	);
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${className ?? ""}`}>
			<ul>{children}</ul>
		</div>
	);
};

export const useClickableStyle = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"&, & *": {
				cursor: "pointer !important",
				color: "black !important",
			},
			"&:hover *": {
				color: "blue !important",
			},
		},
	})
);

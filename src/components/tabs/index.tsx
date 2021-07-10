import { AppBar, makeStyles, Tab, Tabs, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { FC, useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

interface ITabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

const TabPanel: FC<ITabPanelProps> = ({ children, value, index, ...other }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

interface ITabsProps {
	tabHeaders: string[];
	tabs: JSX.Element[];
}

const NTabs: FC<ITabsProps> = ({ tabHeaders, tabs }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs value={value} onChange={(event, value) => setValue(value)}>
					{tabHeaders.map((x) => (
						<Tab label={x} />
					))}
				</Tabs>
			</AppBar>
			{tabs.map((x, i) => (
				<TabPanel value={value} index={i}>
					{x}
				</TabPanel>
			))}
		</div>
	);
};

export default NTabs;

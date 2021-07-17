import { FC, forwardRef, useContext, useEffect, useState } from "react";
import { useRequest } from "../../lib/hooks";
import Loading from "../loading";
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridRowId,
	GridValueGetterParams,
} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { NotificationContext } from "../../lib/notifications";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import {
	AppBar,
	createStyles,
	IconButton,
	makeStyles,
	Theme,
	Toolbar,
	Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { GPCAccount } from "../../lib/models";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			position: "relative",
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
	})
);

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
	date: Date;
	onChange: (value: GPCAccount[]) => void;
}

export const AccountTableSelect: FC<IProps> = ({ date, onChange }) => {
	const req = useRequest();

	const [data, setData] = useState<GPCAccount[] | null>(null);

	const getList = async () => {
		const res = await req.get(`${process.env.REACT_APP_API}/gpcaccount/list`);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getList();
	}, []);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 90 },
		{
			field: "name",
			headerName: "Name",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				(params.row as GPCAccount).profile.name,
		},
		{
			field: "accountNo",
			headerName: "Account No.",
			width: 170,
		},
		{
			field: "upline",
			headerName: "Upline",
			width: 300,
			valueGetter: (params: GridValueGetterParams) => {
				const account = params.row as GPCAccount;
				return account.upline ? account.upline.profile.name : "[No upline]";
			},
		},
	];

	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

	return (
		<>
			{data ? (
				<DataGrid
					rows={data}
					columns={columns}
					hideFooterPagination={true}
					autoHeight
					checkboxSelection
					selectionModel={selectionModel}
					onSelectionModelChange={(newSelection) => {
						setSelectionModel(newSelection.selectionModel);

						const selectedStocks = data.filter((x) =>
							newSelection.selectionModel.find((y) => y == x.id)
						);
						onChange(selectedStocks);
					}}
				/>
			) : (
				<Loading />
			)}
		</>
	);
};

interface IAccountTableSelectDialogProps {
	date: Date;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSelectionConfirmed: (value: GPCAccount[]) => void;
}

export const AccountTableSelectDialog: FC<IAccountTableSelectDialogProps> = ({
	date,
	open,
	setOpen,
	onSelectionConfirmed,
}) => {
	const classes = useStyles();
	const nc = useContext(NotificationContext);

	const [selection, setSelection] = useState<GPCAccount[]>([]);

	const handleClose = () => setOpen(false);
	const handleApply = async () => {
		if (selection.length == 0) {
			await nc.msgbox.show("No item selected", "Select Stocks");
			return;
		}

		onSelectionConfirmed(selection);
		setOpen(false);
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Select Accounts
						</Typography>
						<Button onClick={handleClose} color="inherit">
							Cancel
						</Button>
						<Button onClick={handleApply} color="inherit">
							Apply
						</Button>
					</Toolbar>
				</AppBar>
				<AccountTableSelect
					date={date}
					onChange={(value) => setSelection(value)}
				/>
			</Dialog>
		</>
	);
};

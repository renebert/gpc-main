import { FC, forwardRef, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../lib/hooks";
import Loading from "../loading";
import { Category, Stock, Unit } from "../../lib/models-inventory";
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridRowId,
	GridValueGetterParams,
} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
	selectedIds: number[];
	onChange: (value: Stock[]) => void;
}

export const StocksSelect: FC<IProps> = ({ selectedIds, onChange }) => {
	const g = useGlobal();
	const req = useRequest();

	const [data, setData] = useState<Stock[] | null>(null);

	const getList = async () => {
		const res = await req.get(`${g.API_URL}/inventory/stock/list`);
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
			field: "stockName",
			headerName: "Stock Name",
			width: 300,
		},
		{
			field: "description",
			headerName: "Description",
			width: 350,
		},
		{
			field: "unitId",
			headerName: "Unit",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "unit") as Unit)?.unit,
		},
		{
			field: "categoryId",
			headerName: "Category",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				(params.getValue(params.id, "category") as Category)?.category,
		},
	];

	const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);

	return (
		<>
			{data ? (
				<DataGrid
					rows={data.filter((x) => !selectedIds.find((y) => y == x.id))}
					columns={columns}
					pageSize={pageSize}
					onPageSizeChange={(params: GridPageChangeParams) =>
						setPageSize(params.pageSize)
					}
					rowsPerPageOptions={[5, 10, 20]}
					autoHeight
					pagination
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

interface IStocksSelectDialogProps {
	selectedIds: number[];
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSelectionConfirmed: (value: Stock[]) => void;
}

export const StocksSelectDialog: FC<IStocksSelectDialogProps> = ({
	selectedIds,
	open,
	setOpen,
	onSelectionConfirmed,
}) => {
	const classes = useStyles();
	const nc = useContext(NotificationContext);

	const [selection, setSelection] = useState<Stock[]>([]);

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
							Select Stocks
						</Typography>
						<Button onClick={handleClose} color="inherit">
							Cancel
						</Button>
						<Button onClick={handleApply} color="inherit">
							Apply
						</Button>
					</Toolbar>
				</AppBar>
				<StocksSelect
					selectedIds={selectedIds}
					onChange={(value) => setSelection(value)}
				/>
			</Dialog>
		</>
	);
};

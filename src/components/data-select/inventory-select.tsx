import { FC, forwardRef, useContext, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../lib/hooks";
import Loading from "../loading";
import { Category, Inventory, Stock, Unit } from "../../lib/models-inventory";
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridRowId,
	GridValueFormatterParams,
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
import { FDateCustom, FDouble } from "../../lib/common";

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
	warehouseId: number;
	date: Date;
	selectedIds: number[];
	onChange: (value: Inventory[]) => void;
}

export const InventorySelect: FC<IProps> = ({
	warehouseId,
	date,
	selectedIds,
	onChange,
}) => {
	const req = useRequest();

	const [data, setData] = useState<Inventory[] | null>(null);

	const getList = async () => {
		const res = await req.get(
			`${
				process.env.REACT_APP_API
			}/inventory/report?warehouseId=${warehouseId}&date=${FDateCustom(
				date,
				"MM-DD-YYYY"
			)}`
		);
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
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.stockName,
		},
		{
			field: "description",
			headerName: "Description",
			width: 300,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.description,
		},
		{
			field: "unit",
			headerName: "Unit",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.unit?.unit,
		},
		{
			field: "category",
			headerName: "Category",
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.stock?.category?.category,
		},
		{
			field: "qty",
			headerName: "Qty",
			width: 100,
		},
		{
			field: "price",
			headerName: "Price",
			width: 150,
			headerAlign: "right",
			align: "right",
			valueFormatter: (params: GridValueFormatterParams) =>
				FDouble(Number(params.value)),
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

interface IInventorySelectDialogProps {
	warehouseId: number;
	date: Date;
	selectedIds: number[];
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSelectionConfirmed: (value: Inventory[]) => void;
}

export const InventorySelectDialog: FC<IInventorySelectDialogProps> = ({
	warehouseId,
	date,
	selectedIds,
	open,
	setOpen,
	onSelectionConfirmed,
}) => {
	const classes = useStyles();
	const nc = useContext(NotificationContext);

	const [selection, setSelection] = useState<Inventory[]>([]);

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
				<InventorySelect
					warehouseId={warehouseId}
					date={date}
					selectedIds={selectedIds}
					onChange={(value) => setSelection(value)}
				/>
			</Dialog>
		</>
	);
};

import { FC, useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
	AddressData,
	AddressDataType,
	Address,
	BrgyCity,
} from "../../lib/models";
import { GetAddressString } from "../../lib/common";
import { useGlobal } from "../../lib/hooks";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Tooltip,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { StyledViewField, useClickableStyle } from "../styled";
import { NotificationContext } from "../../lib/notifications";

interface IElementProps {
	addr: Address;
	type: AddressDataType;
	initialId: number;
	onChange: (data: AddressData | null, manual: boolean) => void;
	label: string;
	parentId?: number;
}

const AddressElement: FC<IElementProps> = ({
	addr,
	type,
	parentId,
	initialId,
	onChange,
	label,
}) => {
	const [data, setData] = useState<AddressData[]>([]);
	const [value, setValue] = useState<AddressData | null>(null);
	const [valueStr, setValueStr] = useState("");

	const getData = () => {
		let ret: AddressData[] = [];
		if (type == "country")
			ret =
				addr.countries
					.filter((x) => parentId == undefined || x.id == parentId)
					.map((x) => new AddressData(x, "country")) ?? [];
		if (type == "region")
			ret =
				addr.regions
					.filter((x) => parentId == undefined || x.countryId == parentId)
					.map((x) => new AddressData(x, "region")) ?? [];
		if (type == "province")
			ret =
				addr.provinces
					.filter((x) => parentId == undefined || x.regionId == parentId)
					.map((x) => new AddressData(x, "province")) ?? [];
		if (type == "city")
			ret =
				addr.mun_Cities
					.filter((x) => parentId == undefined || x.provinceId == parentId)
					.map((x) => new AddressData(x, "city")) ?? [];
		if (type == "brgy")
			ret =
				addr.brgies
					.filter((x) => parentId == undefined || x.cityId == parentId)
					.map((x) => new AddressData(x, "brgy")) ?? [];
		return ret;
	};

	useEffect(() => {
		const d = getData();
		const v = d.find((x) => x.id == initialId) ?? null;

		setData(d);
		setValue(v);
		onChange(v, false);
	}, [parentId, initialId]);

	return (
		<>
			<Autocomplete
				options={data}
				value={value}
				onChange={(e, v) => {
					setValue(v);
					onChange(v, true);
				}}
				inputValue={valueStr}
				onInputChange={(event, newValue) => setValueStr(newValue)}
				getOptionLabel={(option) => option.name}
				renderInput={(params) => <TextField {...params} label={label} />}
			/>
		</>
	);
};

interface IAddressSelectProps {
	dbAddress: string;
	dbBrgyId: number;
	onChange: (address: string, addressStr: string, brgyId?: number) => void;
	width?: string;
}

const AddressSelect: FC<IAddressSelectProps> = ({
	dbAddress,
	dbBrgyId,
	onChange,
	width,
}) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				width: width ?? "100%",
				position: "relative",
			},
			address: {
				width: "100%",
			},
		})
	);
	const classes = useStyles();
	const g = useGlobal();

	const addr = g.Settings.address;
	const bCity = new BrgyCity(addr, dbBrgyId);

	const [initCountryId, setInitCountryId] = useState(0);
	const [initRegionId, setInitRegionId] = useState(0);
	const [initProvinceId, setInitProvinceId] = useState(0);
	const [initCityId, setInitCityId] = useState(0);
	const [initBrgyId, setInitBrgyId] = useState(0);

	const [country, setCountry] = useState<AddressData | null | undefined>();
	const [region, setRegion] = useState<AddressData | null | undefined>();
	const [province, setProvince] = useState<AddressData | null | undefined>();
	const [city, setCity] = useState<AddressData | null | undefined>();
	const [brgy, setBrgy] = useState<AddressData | null | undefined>();

	const [address, setAddress] = useState(dbAddress);

	const clear = (i: number) => {
		if (i == 5) {
			setInitRegionId(0);
			setRegion(null);
		}
		if (i >= 4) {
			setInitProvinceId(0);
			setProvince(null);
		}
		if (i >= 3) {
			setInitCityId(0);
			setCity(null);
		}
		if (i >= 2) {
			setInitBrgyId(0);
			setBrgy(null);
		}
	};

	useEffect(() => {
		let refs = bCity.Refs ?? {
			countryId: 446,
			regionId: 13,
			provinceId: 50,
			id: 24,
		};

		setInitCountryId(refs.countryId);
		setInitRegionId(refs.regionId);
		setInitProvinceId(refs.provinceId);
		setInitCityId(refs.id);
		setInitBrgyId(dbBrgyId);
	}, []);

	return (
		<div className={classes.root}>
			<AddressElement
				addr={addr}
				type="country"
				label="Country"
				initialId={initCountryId}
				onChange={(data, manual) => {
					setCountry(data);
					if (manual) clear(5);
				}}
			/>
			{country && (
				<AddressElement
					addr={addr}
					type="region"
					label="Region"
					parentId={country.id}
					initialId={initRegionId}
					onChange={(data, manual) => {
						setRegion(data);
						if (manual) clear(4);
					}}
				/>
			)}
			{region && (
				<AddressElement
					addr={addr}
					type="province"
					label="Province"
					parentId={region.id}
					initialId={initProvinceId}
					onChange={(data, manual) => {
						setProvince(data);
						if (manual) clear(3);
					}}
				/>
			)}
			{province && (
				<AddressElement
					addr={addr}
					type="city"
					label="City"
					parentId={province.id}
					initialId={initCityId}
					onChange={(data, manual) => {
						setCity(data);
						if (manual) clear(2);
					}}
				/>
			)}
			{city && (
				<AddressElement
					addr={addr}
					type="brgy"
					label="Brgy"
					parentId={city.id}
					initialId={initBrgyId}
					onChange={(data, manual) => {
						setBrgy(data);
						const s = GetAddressString(addr, data?.id, address);
						onChange(address, s, data?.id);
					}}
				/>
			)}

			<br />
			<TextField
				className={classes.address}
				label="Street/House No."
				placeholder="Write address here (i.e. House No., Street No., Village/Subd. Name)"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				onBlur={(e) => {
					if (brgy) {
						const s = GetAddressString(addr, brgy.id, e.target.value);
						onChange(e.target.value, s, brgy?.id);
					}
				}}
			/>
			<br />
			<br />
		</div>
	);
};

interface IAddressSelectDialogProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSelectionConfirmed: (
		brgyId: number,
		address: string,
		addressStr: string
	) => void;
	prefix: string;
	dbAddress: string;
	dbBrgyId: number;
	streetRequired?: boolean;
}

export const AddressSelectDialog: FC<IAddressSelectDialogProps> = ({
	open,
	setOpen,
	onSelectionConfirmed,
	prefix,
	dbAddress,
	dbBrgyId,
	streetRequired,
}) => {
	const nc = useContext(NotificationContext);

	const [brgyId, setBrgyId] = useState(dbBrgyId);
	const [address, setAddress] = useState(dbAddress);
	const [addressString, setAddressString] = useState("");

	const handleClose = () => setOpen(false);

	const validate = () => {
		let ret: string[] = [];
		if (brgyId <= 0) ret.push("Brgy is required");
		if (streetRequired && address.trim() == "")
			ret.push("Street address is required");

		return ret;
	};

	const handleApply = () => {
		const errors = validate();
		if (errors.length > 0) {
			nc.snackbar.show(errors, "warning");
			return;
		}

		onSelectionConfirmed(brgyId, address, addressString);
		setOpen(false);
	};

	return (
		<>
			<Dialog
				onClose={handleClose}
				open={open}
				disableBackdropClick
				disableEscapeKeyDown
				maxWidth="lg"
			>
				<DialogTitle>{`${prefix} Address`}</DialogTitle>
				<DialogContent>
					<div style={{ width: "500px" }}>
						<AddressSelect
							dbAddress={dbAddress}
							dbBrgyId={dbBrgyId}
							width="100%"
							onChange={(address, addressString, brgyId) => {
								setBrgyId(brgyId ?? 0);
								setAddress(address);
								setAddressString(addressString);
							}}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="default">
						Cancel
					</Button>
					<Button onClick={handleApply} variant="contained" color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

interface IAddressSelectWidgetProps {
	prefix: string;
	dbAddress: string;
	dbBrgyId: number;
	onSelectionConfirmed: (
		brgyId: number,
		address: string,
		addressStr: string
	) => void;
	streetRequired?: boolean;
}

export const AddressSelectWidget: FC<IAddressSelectWidgetProps> = ({
	prefix,
	dbAddress,
	dbBrgyId,
	onSelectionConfirmed,
	streetRequired,
}) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				display: "inline-block",

				minWidth: 350,
				"& *": {
					width: "100% !important",
				},
			},
		})
	);

	const classes = useStyles();
	const clickable = useClickableStyle();

	const g = useGlobal();
	const addr = g.Settings.address;

	const [addressString, setAddressString] = useState("");
	const [brgyId, setBrgyId] = useState(dbBrgyId);
	const [address, setAddress] = useState(dbAddress);

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	useEffect(() => {
		let s = GetAddressString(addr, brgyId, address);
		if (s.trim() == "") s = `[${prefix} address not set]`;
		setAddressString(s);
	}, [brgyId, address]);

	return (
		<>
			<div
				className={`${classes.root} ${clickable.root}`}
				onClick={handleClick}
			>
				<Tooltip title={addressString}>
					<TextField
						disabled
						label={`${prefix} Address`}
						value={addressString}
					/>
				</Tooltip>
			</div>
			<AddressSelectDialog
				open={open}
				setOpen={setOpen}
				prefix={prefix}
				dbAddress={dbAddress}
				dbBrgyId={dbBrgyId}
				onSelectionConfirmed={(brgyId, address, addressStr) => {
					setBrgyId(brgyId);
					setAddress(address);
					onSelectionConfirmed(brgyId, address, addressStr);
				}}
				streetRequired={streetRequired}
			/>
		</>
	);
};

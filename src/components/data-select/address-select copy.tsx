import { FC, useEffect, useState } from "react";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Brgy, Country, MunCity, Province, Region } from "../../lib/models";
// import { GetAddressRefs, GetAddressString } from "../../lib/common";
// import { useGlobal } from "../../lib/hooks";
// import {
// 	FormControl,
// 	Grid,
// 	InputLabel,
// 	MenuItem,
// 	Select,
// 	TextField,
// } from "@material-ui/core";

// const useStyles = makeStyles((theme: Theme) =>
// 	createStyles({
// 		formControl: {
// 			margin: theme.spacing(1),
// 			minWidth: 120,
// 		},
// 		selectEmpty: {
// 			marginTop: theme.spacing(2),
// 		},
// 	})
// );

// interface IProps {
// 	prefix: string;
// 	dbAddress: string;
// 	dbBrgyId: number;
// 	onChange: (brgyId: number, address: string) => void;
// 	required?: boolean;
// }

// const AddressSelect: FC<IProps> = ({
// 	prefix,
// 	dbAddress,
// 	dbBrgyId,
// 	onChange,
// 	required,
// }) => {
// 	const classes = useStyles();
// 	const g = useGlobal();

// 	const addr = g.Settings.address;

// 	const regionName = `${prefix}_Region`;
// 	const provinceName = `${prefix}_Province`;
// 	const cityName = `${prefix}_City`;
// 	const brgyName = `${prefix}_Brgy`;

// 	const [countryId, setCountryId] = useState(-1);
// 	const [regionId, setRegionId] = useState(-1);
// 	const [provinceId, setProvinceId] = useState(-1);
// 	const [cityId, setCityId] = useState(-1);
// 	const [brgyId, setBrgyId] = useState(-1);

// 	const [countries] = useState<Country[]>(addr.countries);
// 	const [regions, setRegions] = useState<Region[]>([]);
// 	const [provinces, setProvinces] = useState<Province[]>([]);
// 	const [cities, setCities] = useState<MunCity[]>([]);
// 	const [brgies, setBrgies] = useState<Brgy[]>([]);
// 	const [address, setAddress] = useState(dbAddress);

// 	const [addressString, setAddressString] = useState("");

// 	const countryChanged = (_countryId: number) => {
// 		const _regions = addr.regions.filter((x) => x.countryId === _countryId);
// 		setRegions(_regions);
// 		setProvinces([]);
// 		setCities([]);
// 		setBrgies([]);

// 		setCountryId(_countryId);
// 		setRegionId(-1);
// 		setProvinceId(-1);
// 		setCityId(-1);
// 		setBrgyId(-1);
// 		changeField(-1, address);
// 	};

// 	const regionChanged = (_regionId: number) => {
// 		const _provinces = addr.provinces.filter((x) => x.regionId === _regionId);
// 		setProvinces(_provinces);
// 		setCities([]);
// 		setBrgies([]);

// 		setRegionId(_regionId);
// 		setProvinceId(-1);
// 		setCityId(-1);
// 		setBrgyId(-1);
// 		changeField(-1, address);
// 	};

// 	const provinceChanged = (_provinceId: number) => {
// 		const _cities = addr.mun_Cities.filter((x) => x.provinceId === _provinceId);
// 		setCities(_cities);
// 		setBrgies([]);

// 		setProvinceId(_provinceId);
// 		setCityId(-1);
// 		setBrgyId(-1);
// 		changeField(-1, address);
// 	};

// 	const cityChanged = (_cityId: number) => {
// 		const _brgies = addr.brgies.filter((x) => x.cityId === _cityId);
// 		setBrgies(_brgies);

// 		setCityId(_cityId);
// 		setBrgyId(-1);
// 		changeField(-1, address);
// 	};

// 	const brgyChanged = (_brgyId: number) => {
// 		setBrgyId(_brgyId);
// 		changeField(_brgyId, address);
// 	};

// 	const addressChanged = (address: string) => {
// 		setAddress(address);
// 		changeField(brgyId, address);
// 	};

// 	const changeField = (brgyId: number, address: string) => {
// 		prepAddressString(brgyId, address);
// 		onChange(brgyId, address);
// 	};

// 	const prepAddressString = (brgyId: number, address: string) => {
// 		let s = GetAddressString(addr, brgyId, address, true, true);
// 		setAddressString(s);
// 	};

// 	useEffect(() => {
// 		let refs = GetAddressRefs(addr, dbBrgyId);
// 		setCountryId(refs.countryId);
// 	}, [dbBrgyId]);

// 	useEffect(() => {}, [countryId]);

// 	useEffect(() => {
// 		changeField(brgyId, address);
// 	}, [address]);

// 	return (
// 		<div className="address">
// 			<h5>{`${prefix} Address`}</h5>
// 			<Grid container>
// 				<Grid item>
// 					<FormControl className={classes.formControl}>
// 						<InputLabel>Country</InputLabel>
// 						<Select
// 							value={countryId}
// 							onChange={(e) => {
// 								const _countryId = Number(e.target.value);
// 								countryChanged(_countryId);
// 							}}
// 						>
// 							<MenuItem key={-1} value={-1}>
// 								[Select Country]
// 							</MenuItem>
// 							{countries.map((x) => (
// 								<MenuItem key={x.id} value={x.id}>
// 									{x.country}
// 								</MenuItem>
// 							))}
// 						</Select>
// 					</FormControl>
// 				</Grid>
// 			</Grid>
// 			<Grid container>
// 				<Grid item>
// 					{regions.length > 0 && (
// 						<>
// 							<FormControl className={classes.formControl}>
// 								<InputLabel>Region</InputLabel>
// 								<Select
// 									id={regionName}
// 									name={regionName}
// 									value={regionId}
// 									onChange={(e) => {
// 										const _regionId = Number(e.target.value);
// 										regionChanged(_regionId);
// 									}}
// 								>
// 									<MenuItem key={-1} value={-1}>
// 										[Select Region]
// 									</MenuItem>
// 									{regions.map((x) => (
// 										<MenuItem key={x.id} value={x.id}>
// 											{x.region}
// 										</MenuItem>
// 									))}
// 								</Select>
// 							</FormControl>
// 						</>
// 					)}
// 				</Grid>
// 			</Grid>
// 			<Grid container>
// 				<Grid item>
// 					{provinces.length > 0 && (
// 						<>
// 							<FormControl className={classes.formControl}>
// 								<InputLabel>Province</InputLabel>
// 								<Select
// 									id={provinceName}
// 									name={provinceName}
// 									value={provinceId}
// 									onChange={(e) => {
// 										const _provinceId = Number(e.target.value);
// 										provinceChanged(_provinceId);
// 									}}
// 								>
// 									<MenuItem key={-1} value={-1}>
// 										[Select Province]
// 									</MenuItem>
// 									{provinces.map((x) => (
// 										<MenuItem key={x.id} value={x.id}>
// 											{x.province}
// 										</MenuItem>
// 									))}
// 								</Select>
// 							</FormControl>
// 						</>
// 					)}
// 				</Grid>
// 			</Grid>
// 			<Grid container>
// 				<Grid item>
// 					{cities.length > 0 && (
// 						<>
// 							<FormControl className={classes.formControl}>
// 								<InputLabel>City</InputLabel>
// 								<Select
// 									id={cityName}
// 									name={cityName}
// 									value={cityId}
// 									onChange={(e) => {
// 										const _cityId = Number(e.target.value);
// 										cityChanged(_cityId);
// 									}}
// 								>
// 									<MenuItem key={-1} value={-1}>
// 										[Select City]
// 									</MenuItem>
// 									{cities.map((x) => (
// 										<MenuItem key={x.id} value={x.id}>
// 											{x.city}
// 										</MenuItem>
// 									))}
// 								</Select>
// 							</FormControl>
// 						</>
// 					)}
// 				</Grid>
// 			</Grid>
// 			<Grid container>
// 				<Grid item>
// 					{brgies.length > 0 && (
// 						<>
// 							<FormControl className={classes.formControl}>
// 								<InputLabel>Brgy</InputLabel>
// 								<Select
// 									id={brgyName}
// 									name={brgyName}
// 									value={brgyId}
// 									onChange={(e) => {
// 										const _brgyId = Number(e.target.value);
// 										brgyChanged(_brgyId);
// 									}}
// 								>
// 									<MenuItem key={-1} value={-1}>
// 										[Select Brgy]
// 									</MenuItem>
// 									{brgies.map((x) => (
// 										<MenuItem key={x.id} value={x.id}>
// 											{x.brgy}
// 										</MenuItem>
// 									))}
// 								</Select>
// 							</FormControl>
// 						</>
// 					)}
// 				</Grid>
// 			</Grid>
// 			<Grid container>
// 				<Grid item>
// 					<TextField
// 						required={required ?? false}
// 						inputProps={{ maxlength: 200 }}
// 						placeholder="Write address here (i.e. House No., Street No., Village/Subd. Name)"
// 						value={address}
// 						onChange={(e) => {
// 							addressChanged(e.target.value);
// 						}}
// 					/>
// 				</Grid>
// 			</Grid>
// 			<Grid>
// 				<Grid>
// 					<p>{addressString}</p>
// 				</Grid>
// 			</Grid>
// 		</div>
// 	);
// };

// export default AddressSelect;

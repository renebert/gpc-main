import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { GPCAccount } from "../lib/models";
import { useGlobal, useRequest } from "../lib/hooks";
import Loading from "./loading";

interface IAccountSearchProps {
	value?: GPCAccount;
	onChange?: (value: GPCAccount | undefined) => void;
	refresh?: Date;
	inputLabel?: string;
}

export const AccountSearch: FC<IAccountSearchProps> = ({
	value,
	onChange,
	refresh,
	inputLabel,
}) => {
	const g = useGlobal();
	const req = useRequest();

	const getLabel = (v?: GPCAccount) => {
		const ret = v
			? `${v.accountNo}: ${v.profile.name} (${v.profile.email})`
			: "";
		return ret;
	};

	const [data, setData] = useState<GPCAccount[] | null>(null);
	const [val, setValue] = useState<GPCAccount | null>(null);
	const [inputValue, setInputValue] = useState("");

	const getList = async () => {
		const res = await req.get(`${g.API_URL}/gpcaccount/list`);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getList();
		setValue(value ?? null);
		setInputValue(getLabel(value));
	}, [refresh, value]);

	return (
		<>
			{data ? (
				<Autocomplete
					value={val}
					onChange={(event, newValue) => {
						setValue(newValue);
						onChange && onChange(newValue ?? undefined);
					}}
					inputValue={inputValue}
					onInputChange={(event, newValue) => setInputValue(newValue ?? "")}
					options={data}
					getOptionLabel={(option) => getLabel(option)}
					renderInput={(params) => (
						<TextField {...params} label={inputLabel} required />
					)}
				/>
			) : (
				<Loading />
			)}
		</>
	);
};

AccountSearch.defaultProps = {
	inputLabel: "Select Account",
};

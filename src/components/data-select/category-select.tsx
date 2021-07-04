import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../lib/hooks";
import Loading from "../loading";
import { Category } from "../../lib/models-inventory";

interface IProps {
	value?: Category;
	onChange?: (value: Category | undefined) => void;
	refresh?: Date;
	inputLabel?: string;
}

export const CategorySelect: FC<IProps> = ({
	value,
	onChange,
	refresh,
	inputLabel,
}) => {
	const g = useGlobal();
	const req = useRequest();

	const [data, setData] = useState<Category[] | null>(null);
	const [val, setValue] = useState<Category | null>(null);
	const [inputValue, setInputValue] = useState("");

	const getList = async () => {
		const res = await req.get(`${g.API_URL}/inventory/category/list`);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getList();
		setValue(value ?? null);
		setInputValue(value?.category ?? "");
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
					getOptionLabel={(option) => option.category}
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

CategorySelect.defaultProps = {
	inputLabel: "Select Category",
};

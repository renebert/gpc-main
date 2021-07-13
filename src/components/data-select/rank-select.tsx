import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useGlobal, useRequest } from "../../lib/hooks";
import Loading from "../loading";
import { Rank } from "../../lib/models-bm";

interface IProps {
	value?: Rank;
	onChange?: (value: Rank | undefined) => void;
	refresh?: Date;
	inputLabel?: string;
}

export const RankSelect: FC<IProps> = ({
	value,
	onChange,
	refresh,
	inputLabel,
}) => {
	const req = useRequest();

	const [data, setData] = useState<Rank[] | null>(null);
	const [val, setValue] = useState<Rank | null>(null);
	const [inputValue, setInputValue] = useState("");

	const getList = async () => {
		const res = await req.get(
			`${process.env.REACT_APP_API}/business-model/rank/list`
		);
		if (res.success) {
			setData(res.data);
		}
	};

	useEffect(() => {
		getList();
		setValue(value ?? null);
		setInputValue(value?.description ?? "");
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
					getOptionLabel={(option) => option.description}
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

RankSelect.defaultProps = {
	inputLabel: "Select Rank",
};

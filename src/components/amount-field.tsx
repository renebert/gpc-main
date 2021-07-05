import { TextField, TextFieldProps } from "@material-ui/core";
import { FC, useState } from "react";
import { FDouble } from "../lib/common";

interface IAmountProps {
	value: number | null;
	onFinalChange: (value: number) => void;
	tfProps: TextFieldProps;
	zeroIsAllowed: boolean;
}

export const AmountField: FC<IAmountProps> = (props) => {
	const [v, setV] = useState(FDouble(Number(props.value ?? "0")));

	return (
		<TextField
			{...props.tfProps}
			value={v}
			onChange={(e) => {
				if (!isNaN(Number(e.target.value))) {
					const n = parseFloat(e.target.value);

					const valid = props.zeroIsAllowed ? n >= 0 : n > 0;
					if (valid) {
						setV(e.target.value);
					}
				}
			}}
			onBlur={(e) => {
				let s = e.target.value.replace(",", "");
				const finalValue = parseFloat(s);
				setV(FDouble(finalValue));
				props.onFinalChange(finalValue);
			}}
		/>
	);
};

import { GridCellParams, isNumber } from "@material-ui/data-grid";
import { TextField, TextFieldProps } from "@material-ui/core";
import { DeliveryItem } from "../lib/models-inventory";
import { FC, useState } from "react";
import { FDouble } from "../lib/common";

interface IAmountProps {
	value: number | null;
	onFinalChange: (value: number) => void;
	tfProps: TextFieldProps;
}

export const RenderAmount: FC<IAmountProps> = (props) => {
	const [v, setV] = useState(FDouble(Number(props.value ?? "0")));

	return (
		<TextField
			{...props.tfProps}
			value={v}
			onChange={(e) => {
				if (!isNaN(Number(e.target.value))) {
					const n = parseFloat(e.target.value);
					if (n >= 0) {
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

interface IProps {
	data: DeliveryItem[] | null;
	setData: React.Dispatch<React.SetStateAction<DeliveryItem[] | null>>;
	params: GridCellParams;
	fieldName: "qty" | "price";
}

export const RenderCell: FC<IProps> = ({
	data,
	setData,
	params,
	fieldName,
}) => {
	const s = FDouble(Number(data?.find((x) => x.id == params.id)?.price));
	const [tmp, setTmp] = useState<string>(s);

	if (data == null) return <></>;

	if (fieldName === "qty")
		return (
			<TextField
				value={data.find((x) => x.id == params.id)?.qty}
				required
				type="number"
				variant="outlined"
				inputProps={{ style: { textAlign: "center" } }}
				onChange={(e) => {
					let ds = [...data];
					let d = ds.find((x) => x.id == params.id);
					if (d) {
						if (!isNaN(Number(e.target.value))) {
							const n = parseInt(e.target.value);
							if (n > 0) d.qty = n;
						}
						setData && setData([...ds]);
					}
				}}
			/>
		);
	else
		return (
			// <TextField
			// 	value={tmp}
			// 	required
			// 	variant="outlined"
			// 	inputProps={{ style: { textAlign: "right" } }}
			// 	onChange={(e) => {
			// 		let ds = [...data];
			// 		let d = ds.find((x) => x.id == params.id);
			// 		if (d) {
			// 			if (!isNaN(Number(e.target.value))) {
			// 				const n = parseFloat(e.target.value);
			// 				if (n >= 0) {
			// 					setTmp(e.target.value);
			// 					d.price = n;
			// 					setData && setData([...ds]);
			// 				}
			// 			}
			// 		}
			// 	}}
			// 	onBlur={(e) => {
			// 		let s = e.target.value.replace(",", "");
			// 		setTmp(FDouble(parseFloat(s)));
			// 	}}
			// />
			<RenderAmount
				value={data.find((x) => x.id == params.id)?.price ?? null}
				onFinalChange={(value) => {
					let ds = [...data];
					let d = ds.find((x) => x.id == params.id);
					if (d) {
						d.price = value;
						setData([...ds]);
					}
				}}
				tfProps={{
					required: true,
					variant: "outlined",
					inputProps: { style: { textAlign: "right" } },
				}}
			/>
		);
};

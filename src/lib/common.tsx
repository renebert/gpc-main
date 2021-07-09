import { AxiosResponse } from "axios";
import ErrorPage from "../pages/error-page";
import { Address } from "./models";
import moment from "moment";

export class SuccessRequestResult {
	success: boolean = true;
	message: string = "";
	errorMessage: string = "";
	data: any = null;
}

export class RequestResult {
	success: boolean = true;
	statusCode: number = 200;
	data: any = null;
	message?: string;
	error?: string;
	cancelled: boolean = false;
}

export const GetRequestResult = (res: AxiosResponse<any>) => {
	let rres = new RequestResult();
	if (
		res &&
		(res?.status === 200 || res?.status === 201 || res?.status === 204)
	) {
		let sres: SuccessRequestResult = res.data;
		rres.statusCode = res.status;

		if (sres.success) {
			rres.data = sres.data;
			rres.message = sres.message;
		} else {
			rres.success = false;
			rres.error = sres.errorMessage;
		}
	} else {
		rres.success = false;
		rres.statusCode = res?.status;
		rres.data = res?.data;
		rres.error =
			"An error occured while processing the request." +
			(res?.status ? " (" + res?.status + ")" : "");
	}
	return rres;
};

export const GetAddressString = (
	addr: Address,
	brgyId?: number,
	address?: string,
	showProvince?: boolean,
	showRegion?: boolean
) => {
	let ret = "";

	const b = addr.brgies.find((x) => x.id === brgyId);
	if (b) {
		const vw = addr.vwCities.find((x) => x.id === b.cityId);
		if (vw) {
			ret = address ?? "";
			ret += `${ret ? ", " : ""}${b.brgy}, ${vw.city}${
				vw.isCity ? " City" : ""
			}`;
			ret += showProvince ? ", " + vw.province : "";
			ret += showRegion ? ", " + vw.region : "";
			ret += ", " + vw.country;
		}
	}

	return ret;
};

export const NoProfileError = (pageName: string) => {
	return (
		<ErrorPage
			title={`Unauthorized Access to ${pageName} page`}
			subtitle="You don't have an existing profile"
			description="Please create a profile before accessing this page"
			navigation={{ path: "/", text: "Back to Home" }}
		/>
	);
};

export type InitPeriodType = "day" | "month" | "custom";
export class Period {
	startDate: Date;
	endDate: Date;

	constructor(startDate?: Date, endDate?: Date, initType?: InitPeriodType) {
		const d = new Date();

		const useInitType = !startDate && !endDate;
		if (useInitType) {
			if (initType == "day") {
				startDate = d;
				endDate = d;
			} else if (initType == "month") {
				startDate = new Date(d.getFullYear(), d.getMonth(), 1);
				endDate = new Date(d.getFullYear(), d.getMonth() + 1, 1);
				endDate.setDate(endDate.getDate() - 1);
			}
		}

		if (startDate) this.startDate = startDate;
		else this.startDate = d;

		if (endDate) this.endDate = endDate;
		else this.endDate = d;
	}

	get OneDay() {
		return this.startDate == this.endDate;
	}

	get IsValid() {
		return this.startDate <= this.endDate;
	}
}

type dtType = Date | null | undefined;
type numType = number | null;

export const FDateCustom = (dt: dtType, format: string) => {
	return dt ? moment(dt).format(format) : "";
};

export const FDate = (dt: dtType) => {
	return dt ? moment(dt).format("DD MMM YYYY") : "";
};

export const FDateTime = (dt: dtType) => {
	return dt ? moment(dt).format("DD MMM YYYY, h:mm:ss A") : "";
};

export const FPeriod = (startDate?: Date, endDate?: Date, format?: string) => {
	let ret = "";
	const period = new Period(startDate, endDate);
	if (period.IsValid) {
		let f = format ?? "MM/DD/YYYY";
		ret = `${FDateCustom(period.startDate, f)} - ${FDateCustom(
			period.endDate,
			f
		)}`;
	} else {
		ret = "Invalid period";
	}
	return ret;
};

export const FDouble = (v: numType, decimalPlaces?: number) => {
	if (v == null) v = 0;

	if (decimalPlaces == undefined) {
		decimalPlaces = 2;
	}

	return new Intl.NumberFormat("en-PH", {
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces,
	}).format(v);
};

export const FCurrency = (v: numType) => {
	if (v == null) v = 0;

	return new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
	}).format(v);
};

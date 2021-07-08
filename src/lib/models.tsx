export type AddressDataType =
	| "country"
	| "region"
	| "province"
	| "city"
	| "brgy";

export class AddressData {
	id: number = 0;
	parentId: number = 0;
	name: string = "";
	constructor(data: any, type: AddressDataType) {
		if (type == "country") {
			const d = data as Country;
			this.id = d.id;
			this.parentId = 0;
			this.name = d.country;
		}
		if (type == "region") {
			const d = data as Region;
			this.id = d.id;
			this.parentId = d.countryId;
			this.name = d.region;
		}
		if (type == "province") {
			const d = data as Province;
			this.id = d.id;
			this.parentId = d.regionId;
			this.name = d.province;
		}
		if (type == "city") {
			const d = data as MunCity;
			this.id = d.id;
			this.parentId = d.provinceId;
			this.name = d.city;
		}
		if (type == "brgy") {
			const d = data as Brgy;
			this.id = d.id;
			this.parentId = d.cityId;
			this.name = d.brgy;
		}
	}
}

export class Country {
	id: number = -1;
	country: string = "";
	nationality: string = "";
}

export class Region {
	id: number = -1;
	countryId: number = -1;
	region: string = "";
}

export class Province {
	id: number = -1;
	regionId: number = -1;
	province: string = "";
}

export class MunCity {
	id: number = -1;
	provinceId: number = -1;
	city: string = "";
	isCity: boolean = false;
}

export class Brgy {
	id: number = -1;
	cityId: number = -1;
	brgy: string = "";
}

export class vwCity {
	id: number = -1;
	city: string = "";
	isCity: boolean = false;
	provinceId: number = -1;
	province: string = "";
	regionId: number = -1;
	region: string = "";
	countryId: number = -1;
	country: string = "";
	nationality: string = "";
}

export class Address {
	countries: Country[] = [];
	regions: Region[] = [];
	provinces: Province[] = [];
	mun_Cities: MunCity[] = [];
	brgies: Brgy[] = [];
	vwCities: vwCity[] = [];
}

export class BrgyCity {
	addr: Address;
	brgyId: number;
	constructor(addr: Address, brgyId: number) {
		this.addr = addr;
		this.brgyId = brgyId;
	}

	get Refs() {
		const cityId = this.addr.brgies.find((x) => x.id == this.brgyId)?.cityId;
		return this.addr.vwCities.find((x) => x.id == cityId) ?? null;
	}
}

export interface IEnumObj {
	value: number;
	description: string;
}

export class Profile {
	id: number = 0;
	lastName: string = "";
	firstName: string = "";
	middleName: string | null = null;
	nameExt: string | null = null;
	nickName: string | null = null;
	dob: Date = new Date();
	homeAddress: string = "";
	home_Address: string = "";
	home_BrgyId: number = -1;
	email: string = "";
	mobileNo: string | null = null;
	gender: number = 0;
	civilStatus: number = 0;
	fullname: string = "";
	fullname_FN: string = "";
	age: number = 0;
	genderStr: string = "";
	civilStatusStr: string = "";
}

export class QuickProfile {
	id: number = 0;
	name: string = "";
	email: string = "";
}

export class UplineClaim {
	id: number = 0;
	profileId: number = 0;
	lastName: string = "";
	firstName: string = "";
	email: string = "";
	accountNo: string = "";
	nickName: string = "";
	dateCreated: Date;
	lastUpdated: Date;
	isPrestine: boolean = true;

	constructor() {
		let dt = new Date();
		this.dateCreated = dt;
		this.lastUpdated = dt;
	}
}

export class GPCAccount {
	id: number = 0;
	profileId: number = 0;
	gpcAccountRequestId: number = 0;
	accountNo: string = "";
	uplineAccountNo?: string = "";
	profile: QuickProfile = new QuickProfile();
	upline: QuickProfile | null = new QuickProfile();
}

export class GPCAccountRequest {
	id: number = 0;
	profileId: number = 0;
	dateSubmitted: Date = new Date();
	dateApproved: Date | null = null;
	approvedByProfileId: number | null = null;
	dateTrashed: Date | null = null;
	trashedByProfileId: number | null = null;
	dateDenied: Date | null = null;
	deniedByProfileId: number | null = null;
	denyMessage: string | null = null;
	isCancelled: boolean = false;
	isApproved: boolean = false;
	isTrashed: boolean = false;
	isDenied: boolean = false;
	isSubmitted: boolean = false;
	isPending: boolean = false;
	status: number = 0;
	statusDate: Date = new Date();
	statusBy_ProfileId: number = 0;
	statusBy_Name: string = "";
	statusDesc: string = "";
	profile: QuickProfile = new QuickProfile();
}

export class GlobalSettings {
	enum_Genders: IEnumObj[] = [];
	enum_CivilStatus: IEnumObj[] = [];
	address: Address = new Address();
}

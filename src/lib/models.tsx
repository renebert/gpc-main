/*eslint-disable */
export class AddressRefs {
    brgyId: number = -1;
    cityId: number = 24;
    provinceId: number = 50;
    regionId: number = 13;
    countryId: number = 446;
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
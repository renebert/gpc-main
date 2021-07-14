/*eslint-disable */
import React, { useContext, useState } from "react";
import { User } from "@auth0/auth0-react";
import axios from "axios";
import { GlobalSettings, GPCAccount, Profile, UplineClaim } from "./models";
import { GetRequestResult, RequestResult, ReturnRes } from "./common";
import { Warehouse } from "./models-inventory";

export type DataType = "profile" | "upline-claim" | "gpcaccount";

export interface IDataUpdatedSubscription {
	key: string;
	delegate: (data: any) => void;
	dataType?: DataType;
}

export interface ICommonGlobalFields {
	Name: string | undefined;
	Picture: string | undefined;
	Email: string | undefined;
	HasProfile: boolean;
}

export class Subscription {
	private dataUpdatedSubs: IDataUpdatedSubscription[] = [];

	doUpdateData = (dataType?: DataType, data?: any) => {
		this.dataUpdatedSubs?.forEach((subscription) => {
			if (subscription.dataType == dataType) subscription.delegate(data);
		});
	};

	SubscribeToDataUpdatedEvent = (subscription: IDataUpdatedSubscription) => {
		if (
			!this.dataUpdatedSubs.find(
				(x) =>
					x.dataType === subscription.dataType && x.key === subscription.key
			)
		) {
			this.dataUpdatedSubs?.push(subscription);
		}
	};

	UnSubscribeToDataUpdatedEvent = (
		subscriptionKey: string,
		subscriptionDataType?: DataType
	) => {
		this.dataUpdatedSubs = this.dataUpdatedSubs?.filter(
			(x) => x.dataType === subscriptionDataType && x.key !== subscriptionKey
		);
	};
}

class _Global extends Subscription {
	protected server = {
		getSettings: async () => {
			const res = GetRequestResult(
				await axios.get(`${process.env.REACT_APP_API}/settings`)
			);
			return ReturnRes("getSettings", res);
		},
		getProfile: async (email: string) => {
			const res = GetRequestResult(
				await axios.get(`${process.env.REACT_APP_API}/profile?email=${email}`)
			);
			return ReturnRes("getProfile", res);
		},
		getUplineClaim: async (id: number) => {
			const res = GetRequestResult(
				await axios.get(
					`${process.env.REACT_APP_API}/upline-claim?profileId=${id}`
				)
			);
			return ReturnRes("getUplineClaim", res);
		},
		getGPCAccount: async (id: number) => {
			const res = GetRequestResult(
				await axios.get(
					`${process.env.REACT_APP_API}/gpcaccount?profileId=${id}`
				)
			);
			return ReturnRes("getGPCAccount", res);
		},
	};

	protected storage = {
		clear: () => {
			sessionStorage.clear();
		},
		getLoginCount: (namespace: string, email: string | undefined): number => {
			let key = `login_${namespace}_${email}`;
			let v = sessionStorage.getItem(key);
			return parseInt(v ?? "0");
		},
		setLoginCount: (
			namespace: string,
			email: string | undefined,
			count: number
		) => {
			let key = `login_${namespace}_${email}`;
			sessionStorage.setItem(key, count.toString());
		},
		getSettings: (): GlobalSettings => {
			const data = sessionStorage.getItem("settings");
			return data ? (JSON.parse(data) as GlobalSettings) : new GlobalSettings();
		},
		setSettings: (data: GlobalSettings) => {
			sessionStorage.setItem("settings", JSON.stringify(data));
		},
		getUser: (): User | undefined => {
			const data = sessionStorage.getItem("user");
			return data ? (JSON.parse(data) as User) : undefined;
		},
		setUser: (data: User | undefined) => {
			if (data) sessionStorage.setItem("user", JSON.stringify(data));
		},
		getProfile: (): Profile => {
			const data = sessionStorage.getItem("profile");
			return data ? (JSON.parse(data) as Profile) : new Profile();
		},
		setProfile: (data: Profile) => {
			sessionStorage.setItem("profile", JSON.stringify(data));
		},
		getUplineClaim: (): UplineClaim => {
			const data = sessionStorage.getItem("upline-claim");
			return data ? (JSON.parse(data) as UplineClaim) : new UplineClaim();
		},
		setUplineClaim: (data: UplineClaim) => {
			sessionStorage.setItem("upline-claim", JSON.stringify(data));
		},
		getGPCAccount: (): GPCAccount => {
			const data = sessionStorage.getItem("gpcaccount");
			return data ? (JSON.parse(data) as GPCAccount) : new GPCAccount();
		},
		setGPCAccount: (data: GPCAccount) => {
			sessionStorage.setItem("gpcaccount", JSON.stringify(data));
		},
	};
}

export class GlobalInit extends _Global {
	private user: User | undefined;
	private namespace: string;
	IsNewLogin: boolean = false;
	onGetServerData?: (isNewLogin: boolean) => void;
	onGetServerDataDone?: () => void;

	constructor(namespace: string, user: User | undefined) {
		super();
		this.namespace = namespace;
		this.user = user;
	}

	async Init() {
		this.storage.setUser(this.user);

		const u: User = JSON.parse(JSON.stringify(this.user));
		const c = u[`${this.namespace}/login-count`];

		if (c > this.storage.getLoginCount(this.namespace, u.email)) {
			this.IsNewLogin = true;
			this.storage.setLoginCount(this.namespace, u.email, c);

			await this.GetServerData();
		}
	}

	GetServerData = async () => {
		this.onGetServerData && this.onGetServerData(this.IsNewLogin);

		let _settings = await this.server.getSettings();
		this.storage.setSettings(_settings ?? new GlobalSettings());

		let _profile = await this.server.getProfile(this.user?.email ?? "");
		this.storage.setProfile(_profile ?? new Profile());

		if (_profile) {
			let _uplineClaim = await this.server.getUplineClaim(_profile?.id ?? 0);
			this.storage.setUplineClaim(_uplineClaim ?? new UplineClaim());

			let _gpcAccount = await this.server.getGPCAccount(_profile?.id ?? 0);
			this.storage.setGPCAccount(_gpcAccount ?? new GPCAccount());
		}

		this.onGetServerDataDone && this.onGetServerDataDone();
	};

	UpdateProfile = (data: Profile) => {
		this.storage.setProfile(data);
	};

	UpdateUplineClaim = (data: UplineClaim) => {
		this.storage.setUplineClaim(data);
	};

	UpdateGPCAccount = (data: GPCAccount) => {
		this.storage.setGPCAccount(data);
	};
}

export class Access {
	warehouses: Warehouse[] = [];
}

export class Global extends _Global implements ICommonGlobalFields {
	private user: User | undefined;
	private settings: GlobalSettings;
	private profile: Profile;
	private uplineClaim: UplineClaim;
	private gpcAccount: GPCAccount;
	access: Access = new Access();

	constructor() {
		super();
		this.settings = this.storage.getSettings();
		this.user = this.storage.getUser();
		this.profile = this.storage.getProfile();
		this.uplineClaim = this.storage.getUplineClaim();
		this.gpcAccount = this.storage.getGPCAccount();
	}

	UpdateData = (
		dataType: DataType,
		data: Profile | UplineClaim | GPCAccount
	) => {
		if (dataType == "profile") {
			let d = data as Profile;
			this.storage.setProfile(d);
			this.profile = d;
		} else if (dataType == "upline-claim") {
			let d = data as UplineClaim;
			this.storage.setUplineClaim(d);
			this.uplineClaim = d;
		} else if (dataType == "gpcaccount") {
			let d = data as GPCAccount;
			this.storage.setGPCAccount(d);
			this.gpcAccount = d;
		}

		this.doUpdateData(dataType);
	};

	Logout = () => {
		this.storage.clear();
	};

	get User() {
		return this.user;
	}

	get Profile() {
		return this.profile;
	}

	get UplineClaim() {
		return this.uplineClaim;
	}

	get GPCAccount() {
		return this.gpcAccount;
	}

	get Settings() {
		return this.settings;
	}

	get HasProfile() {
		return this.profile?.id != 0;
	}

	get HasUplineClaim() {
		return this.uplineClaim.id != 0;
	}

	get HasGPCAccount() {
		return this.gpcAccount.id != 0;
	}

	get Name() {
		return this.HasProfile ? this.Profile.fullname_FN : this.User?.name;
	}

	get Email() {
		return this.HasProfile ? this.Profile.email : this.User?.email;
	}

	get Picture() {
		return this.User?.picture;
	}
}

const GlobalContext = React.createContext(new Global());
export default GlobalContext;

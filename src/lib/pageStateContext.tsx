import React from "react";

export type PageModeType =
	| "index"
	| "list"
	| "view"
	| "create"
	| "edit"
	| "view-items";

export type Statekey =
	| "base-active-component"
	| "myprofile-setPageMode"
	| "myprofile-setOpenProps"
	| "uplineclaim-setPageMode"
	| "uplineclaim-setOpenProps"
	| "account-requests-setPageMode"
	| "account-requests-setOpenProps"
	| "management-profiles-setPageMode"
	| "management-profiles-setOpenProps"
	| "management-accounts-setPageMode"
	| "management-accounts-setOpenProps"
	| "onlineApplications-account-request-setOpenProps"
	| "onlineApplications-account-request-setPageMode"
	| "categories-setPageMode"
	| "categories-setOpenProps"
	| "deliveries-setPageMode"
	| "deliveries-setOpenProps"
	| "pricelists-setPageMode"
	| "pricelists-setOpenProps"
	| "create-stock-form-setExecSubmit"
	| "stocks-setPageMode"
	| "stocks-setOpenProps"
	| "create-unit-form-setExecSubmit"
	| "units-setPageMode"
	| "units-setOpenProps"
	| "warehouses-setPageMode"
	| "warehouses-setOpenProps"
	| "accountOrders-setPageMode"
	| "accountOrders-setOpenProps"
	| "create-priceList-form-setExecSubmit"
	| "create-category-form-setExecSubmit"
	| "create-delivery-form-setExecSubmit"
	| "create-warehouse-form-setExecSubmit"
	| "create-accountOrder-form-setExecSubmit"
	| "common-profile-form-setExecSubmit"
	| "create-uplineclaim-form-setExecSubmit";

export type StateItem = {
	key: Statekey;
	dispatch: React.Dispatch<React.SetStateAction<any>>;
};

export class PageStateManager {
	private states: StateItem[] = [];

	Add(state: StateItem) {
		this.Remove(state.key);
		this.states.push(state);
	}

	Remove(key: Statekey) {
		this.states = this.states.filter((x) => x.key != key);
	}

	Get(key: Statekey) {
		return this.states.find((x) => x.key == key);
	}
}

const PageStateContext = React.createContext(new PageStateManager());
export default PageStateContext;

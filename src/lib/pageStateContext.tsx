import React from "react";

export type PageModeType = "list" | "view" | "create" | "edit";
export type StateItem = {
	key: string;
	dispatch: React.Dispatch<React.SetStateAction<any>>;
};

export class PageStateManager {
	private states: StateItem[] = [];

	Add(state: StateItem) {
		this.Remove(state.key);
		this.states.push(state);
	}

	Remove(key: string) {
		this.states = this.states.filter((x) => x.key != key);
	}

	Get(key: string) {
		return this.states.find((x) => x.key == key);
	}
}

const PageStateContext = React.createContext(new PageStateManager());
export default PageStateContext;

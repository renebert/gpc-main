import { useContext, useEffect } from "react";
import axios, { AxiosResponse, CancelToken } from "axios";
import GlobalContext, { IDataUpdatedSubscription } from "./global";
import { GetRequestResult, RequestResult } from "./common";
import { NotificationContext } from "./notifications";
import LayoutContext, { LayoutElement } from "./layoutContext";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function useRequest() {
	const nc = useContext(NotificationContext);
	const source = axios.CancelToken.source();

	const exec_request = async (
		method: string,
		url: string,
		data: any,
		cancelToken: CancelToken
	) => {
		let reqResult = new RequestResult();

		try {
			let res: AxiosResponse<any> | any;

			if (method == "get") {
				let p = "";

				if (data) {
					let tmp: string[] = [];
					for (const [key, value] of Object.entries(data)) {
						tmp.push(
							encodeURIComponent(key) +
								"=" +
								encodeURIComponent(value as string)
						);
					}
					p = tmp.join("&");

					if (p) url += (url.indexOf("?") >= 0 ? "&" : "?") + p;
				}

				res = await axios.get(url, {
					cancelToken: cancelToken,
				});
			} else if (method == "post") {
				res = await axios.post(url, data, {
					cancelToken: cancelToken,
				});
			}

			reqResult = GetRequestResult(res);
		} catch (e) {
			reqResult.success = false;
			if (axios.isCancel(e)) {
				reqResult.error = "The request was cancelled. " + (e as Error).message;
				reqResult.cancelled = true;
			} else {
				reqResult.error =
					"An error occured while processing the request. " +
					(e as Error).message;
			}
		}

		if (!reqResult.success && reqResult.error) {
			nc.snackbar.show(reqResult.error, "error");
		}

		return reqResult;
	};

	const request = {
		get: async (url: string, data?: any): Promise<RequestResult> => {
			return await exec_request("get", url, data, source.token);
		},
		post: async (url: string, data?: any): Promise<RequestResult> => {
			return await exec_request("post", url, data, source.token);
		},
	};

	useEffect(() => {
		return () => {
			source.cancel();
		};
	}, []);

	return request;
}

export const useGlobal = (subscriptions?: IDataUpdatedSubscription[]) => {
	const g = useContext(GlobalContext);

	subscriptions &&
		subscriptions.forEach((subs) => g.SubscribeToDataUpdatedEvent(subs));

	useEffect(() => {
		return () => {
			subscriptions &&
				subscriptions.forEach((subs) =>
					g.UnSubscribeToDataUpdatedEvent(subs.key, subs.dataType)
				);
		};
	}, []);

	return g;
};

export const useLayout = () => {
	const theme = useTheme();
	const sm = useMediaQuery(theme.breakpoints.up("sm"));

	const layout = useContext(LayoutContext);

	let rightSidePanels: LayoutElement[] = [];
	let rightSidePanelIndex: number | undefined = undefined;

	let pageCommands: LayoutElement[] = [];
	let pageCommandsIndex: number | undefined = undefined;

	const SetRightSidePanel = (items: LayoutElement[], index?: number) => {
		rightSidePanels = items;
		rightSidePanelIndex = index;
	};

	const SetPageCommands = (items: LayoutElement[], index?: number) => {
		pageCommands = items;
		pageCommandsIndex = index;
	};

	const RemoveItems = () => {};

	useEffect(() => {
		let rspIndexes: string[] = [];
		let pcIndexes: string[] = [];

		rightSidePanels.forEach((x, i) => {
			const index = layout.rightSidePanel.Add(
				x,
				i == 0 ? rightSidePanelIndex : undefined
			);
			rspIndexes.push(x.key);
		});

		pageCommands.forEach((x, i) => {
			const index = layout.pageCommands.Add(
				x,
				i == 0 ? pageCommandsIndex : undefined
			);
			pcIndexes.push(x.key);
		});

		return () => {
			rspIndexes.forEach((x) => layout.rightSidePanel.Remove(x));
			pcIndexes.forEach((x) => layout.pageCommands.Remove(x));
		};
	}, []);

	return {
		ui: layout,
		viewport: {
			sm: sm,
		},
		SetRightSidePanel: SetRightSidePanel,
		SetPageCommands: SetPageCommands,
	};
};

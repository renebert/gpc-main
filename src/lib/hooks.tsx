import { useContext, useEffect } from "react";
import axios, { AxiosResponse, CancelToken } from "axios";
import GlobalContext, { IDataUpdatedSubscription } from "./global";
import { GetRequestResult, RequestResult } from "./common";
import { NotificationContext } from "./notifications";
import PageStateContext from "./pageStateContext";
import { ActiveComponentType } from "../pages/base-page";

export type RequestType = {
	get: (url: string, data?: any) => Promise<RequestResult>;
	post: (url: string, data?: any) => Promise<RequestResult>;
};

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

	const request: RequestType = {
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

export const useNavigation = () => {
	const ps = useContext(PageStateContext);

	const go = (component: ActiveComponentType) => {
		(
			ps.Get("base-active-component")?.dispatch as React.Dispatch<
				React.SetStateAction<string>
			>
		)(component);
	};

	return {
		go: go,
	};
};

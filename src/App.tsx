import { Suspense, lazy, useState, useEffect, useContext, FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Preloader from "./components/preloader";
import { useAuth0 } from "@auth0/auth0-react";
import GlobalContext, { Global, GlobalInit } from "./lib/global";
import Loading from "./components/loading";
import { NotificationContext, SnackbarUI } from "./lib/notifications";
import NCSnackbar, {
	DefaultSbProps,
} from "./components/notifications/snackbar";
import UIContext from "./lib/layoutContext";

const Main = lazy(() => import("./pages/main"));
const Profile = lazy(() => import("./pages/profile"));

function App() {
	const { user, isLoading, error } = useAuth0();

	const [globalInitialized, setGlobalInitialized] = useState(false);
	const [gettingServerData, setGettingServerData] = useState(false);

	const g = new GlobalInit(window.location.origin, user);
	g.onGetServerData = (isNewLogin) => setGettingServerData(true);
	g.onGetServerDataDone = () => setGettingServerData(false);
	g.Init().finally(() => {
		setGlobalInitialized(true);
	});

	const ui = useContext(UIContext);

	//#region Notifications

	let nc = useContext(NotificationContext);

	// const mb = useState(DefaultMsgProps);
	// const cb = useState(DefaultConfirmProps);
	// const pb = useState(DefaultProcProps);
	const sb = useState(DefaultSbProps);

	// const [mbState] = mb;
	// const [cbState] = cb;
	// const [pbState] = pb;
	const [sbState] = sb;

	useEffect(() => {
		// nc.msgbox = new MsgUI(mb);
		// nc.confirmbox = new ConfirmUI(cb);
		// nc.processing = new ProcUI(pb);
		nc.snackbar = new SnackbarUI(sb);
	}, []);
	//#endregion

	if (isLoading) return <div>Loading page...</div>;
	if (error) return <div>Oops... {error.message}</div>;

	if (!globalInitialized) {
		return (
			<div>
				<Loading text="Acquiring global settings..." />
				{gettingServerData && <div>Getting server data...</div>}
			</div>
		);
	}

	return (
		<GlobalContext.Provider value={new Global()}>
			<UIContext.Provider value={ui}>
				<NotificationContext.Provider value={nc}>
					<div id="App">
						<Routes />
						{/* <NCMsgBox {...mbState} />
                    <NCConfirmBox {...cbState} />
                    <NCProcBox {...pbState} /> */}
						<NCSnackbar {...sbState} />
					</div>
				</NotificationContext.Provider>
			</UIContext.Provider>
		</GlobalContext.Provider>
	);
}

export default App;

const Routes: FC = () => {
	return (
		<Router>
			<Suspense fallback={<Preloader />}>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/profile" component={Profile} />
				</Switch>
			</Suspense>
		</Router>
	);
};

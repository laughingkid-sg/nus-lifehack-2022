import { ColorModeScript } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import AppContextProvider from "./context/AppContext";
import { store } from "./store/store";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
	<AppContextProvider>
		<Provider store={store}>
			<BrowserRouter>
				<ColorModeScript />
				<App />
			</BrowserRouter>
		</Provider>
	</AppContextProvider>
);

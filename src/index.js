import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
// reportWebVitals(console.log);

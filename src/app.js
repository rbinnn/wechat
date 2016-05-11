import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App.jsx";
import Store from "./store/Store";


const store = Store();

render(
	<Provider store = { store }>
		<App />
	</Provider>,
	document.querySelector("#container")
);
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Welcome from "./Welcome";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import reducer from "./reducer";
import reduxPromise from "redux-promise";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import { init } from "./socket";

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(reduxPromise))
);

let app;
const isLoggedIn = location.pathname != "/welcome";

if (!isLoggedIn) {
    app = <Welcome />;
} else {
    init(store);
    app = (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

ReactDOM.render(app, document.getElementById("root"));

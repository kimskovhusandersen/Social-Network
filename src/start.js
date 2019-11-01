import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Welcome from "./welcome";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { Provider } from "react-redux";

import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

const isLoggedIn = location.pathname != "/welcome";

ReactDOM.render(
    isLoggedIn ? (
        <Provider store={store}>
            <App />
        </Provider>
    ) : (
        <Welcome />
    ),
    document.querySelector("main")
);

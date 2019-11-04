import React from "react";
import ReactDOM from "react-dom";
import * as io from "socket.io-client";
import App from "./app";
import Welcome from "./welcome";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { Provider } from "react-redux";

const socket = io.connect();

socket.emit("iAmHere", {
    message: "Hello"
});

socket.on("goodToSeeYou", data => console.log(data));

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

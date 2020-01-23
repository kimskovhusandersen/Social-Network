import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Welcome from "./Welcome";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import profileReducer from "./store/reducer/profile";
import photoReducer from "./store/reducer/photo";
import postReducer from "./store/reducer/post";
import friendReducer from "./store/reducer/friend";
import otherProfile from "./store/reducer/otherProfile";
import otherPhoto from "./store/reducer/otherPhoto";
// import reduxPromise from "redux-promise";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import { init } from "./socket";

const combinedReducer = combineReducers({
    profileReducer,
    photoReducer,
    postReducer,
    friendReducer,
    otherProfile,
    otherPhoto
});

const store = createStore(
    combinedReducer,
    composeEnhancers(applyMiddleware(thunk))
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

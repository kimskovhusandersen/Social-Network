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

// let state = {
//     profile: {
//         id: 1,
//         firstName: "Kim",
//         last: "Andersen",
//         aboutMe: null,
//         photos: {
//             profilePhotos: [
//                 {
//                     id: 1,
//                     url: "url"
//                 }
//             ],
//             otherPhotos: [{ id: 2, url: "url" }, { id: 3, url: "url" }]
//         }
//     },
//     otherProfile: {
//         id: 504,
//         firstName: "John",
//         lastName: "Andersen"
//     },
//     isButtonVisible: false
// };
//
// const changeUrl = val =>
//     val.map(photo => ({
//         ...photo,
//         url: "Hi da",
//         title: "Massage oil"
//     }));
// let action = {
//     type: "UPDATE_OTHER_PHOTOS",
//     paths: ["profile", "photos"],
//     data: changeUrl
// };
//
// const r = reducer(state, action);
// console.log("BACK IN START", r, r === state);
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

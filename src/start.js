import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

const isUserLoggedIn = location.pathname != "/welcome";

ReactDOM.render(
    isUserLoggedIn ? <App /> : <Welcome />,
    document.querySelector("main")
);

import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

const isLoggedIn = location.pathname != "/welcome";

ReactDOM.render(
    isLoggedIn ? <App /> : <Welcome />,
    document.querySelector("main")
);

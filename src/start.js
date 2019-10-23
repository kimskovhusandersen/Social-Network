import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { Logo } from "./theme";

const isUserLoggedIn = location.pathname != "/welcome";

ReactDOM.render(
    isUserLoggedIn ? <Logo /> : <Welcome />,
    document.querySelector("main")
);

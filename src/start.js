import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

const isUserLoggedIn = location.pathname == "/welcome";

const Logo = () => (
    <React.Fragment>
        <img src="logo.png" />;
    </React.Fragment>
);

ReactDOM.render(
    isUserLoggedIn ? <Logo /> : <Welcome />,
    document.querySelector("main")
);

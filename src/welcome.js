import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

import { Logo } from "./theme";

// Stateless Functional Component
const Welcome = () => {
    return (
        <React.Fragment>
            <h1>Welcome!</h1>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </React.Fragment>
    );
};

export default Welcome;

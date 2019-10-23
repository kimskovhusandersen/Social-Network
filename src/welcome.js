import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

// Stateless Functional Component
const Welcome = () => {
    return (
        <React.Fragment>
            <h1>Welcome!</h1>
            <img src="/logo.png" />
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

import React from "react";
import { HashRouter, Route } from "react-router-dom";
import AuthRegistration from "./components/auth-registration";
import AuthLogin from "./components/auth-login";

// Stateless Functional Component
const Welcome = () => {
    return (
        <div>
            <div>
                <h1>Welcome!</h1>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={AuthRegistration} />
                        <Route path="/login" component={AuthLogin} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
};

export default Welcome;

import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

import { PageWrapper, Title, Logo } from "./theme";

// Stateless Functional Component
const Welcome = () => {
    return (
        <PageWrapper>
            <Title>Welcome!</Title>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </PageWrapper>
    );
};

export default Welcome;

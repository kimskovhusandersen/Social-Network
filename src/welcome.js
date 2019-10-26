import React from "react";
import { HashRouter, Route } from "react-router-dom";
import UserRegistration from "./user-registration";
import UserLogin from "./user-login";

import { PageWrapper, Title, Logo } from "./theme";

// Stateless Functional Component
const Welcome = () => {
    return (
        <PageWrapper>
            <Title>Welcome!</Title>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={UserRegistration} />
                    <Route path="/login" component={UserLogin} />
                </div>
            </HashRouter>
        </PageWrapper>
    );
};

export default Welcome;

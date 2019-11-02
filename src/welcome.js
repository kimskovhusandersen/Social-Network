import React from "react";
import { HashRouter, Route } from "react-router-dom";
import RegistrationHandler from "./registration-handler";
import LoginHandler from "./login-handler";

import { PageWrapper, Page, Title, Logo } from "./style/theme";

// Stateless Functional Component
const Welcome = () => {
    return (
        <PageWrapper>
            <Page>
                <Title>Welcome!</Title>
                <Logo />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={RegistrationHandler} />
                        <Route path="/login" component={LoginHandler} />
                    </div>
                </HashRouter>
            </Page>
        </PageWrapper>
    );
};

export default Welcome;

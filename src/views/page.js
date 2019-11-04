import React from "react";
import { PageWrapper, InnerPage } from "../style/page";

const Page = ({ hero, content }) => {
    return (
        <React.Fragment>
            {hero}
            <PageWrapper>
                <InnerPage>{content}</InnerPage>
            </PageWrapper>
        </React.Fragment>
    );
};

export default Page;

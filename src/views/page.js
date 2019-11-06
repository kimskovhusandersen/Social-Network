import React from "react";
import {
    ProfilePageWrapper,
    ProfileInnerPage,
    ChatPageWrapper
} from "../style/page";

const Page = ({ hero, content, pageType }) => {
    let elem;
    if (pageType == "chat") {
        elem = (
            <React.Fragment>
                <ChatPageWrapper>{content}</ChatPageWrapper>
            </React.Fragment>
        );
    } else {
        elem = (
            <React.Fragment>
                (
                {!hero ? (
                    <ProfilePageWrapper first>
                        <ProfileInnerPage>{content}</ProfileInnerPage>
                    </ProfilePageWrapper>
                ) : (
                    <React.Fragment>
                        {hero}
                        <ProfilePageWrapper>
                            <ProfileInnerPage>{content}</ProfileInnerPage>
                        </ProfilePageWrapper>
                    </React.Fragment>
                )}
                )
            </React.Fragment>
        );
    }
    return <React.Fragment>{elem}</React.Fragment>;
};

export default Page;

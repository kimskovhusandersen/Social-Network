import React from "react";

import { PageWrapper, Image, Title2, Text } from "./theme";

const ProfilePic = ({ firstname, lastname, profilePicture, toggleSascha }) => {
    console.log(profilePicture);
    return (
        <PageWrapper>
            <Title2>I am the profile Pic!!!</Title2>
            <Image onClick={toggleSascha} src={profilePicture} />
            <Text>
                {firstname} {lastname}
            </Text>
        </PageWrapper>
    );
};

export default ProfilePic;

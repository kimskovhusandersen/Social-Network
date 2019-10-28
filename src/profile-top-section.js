import React from "react";

import { Text, Photo } from "./theme";

const ProfileTopSection = ({ profilePhoto, profile }) => {
    return (
        <React.Fragment>
            <Text>some other background image</Text>
            {profilePhoto}
            {profile.firstName}
            {profile.middleName}
            {profile.lastName}
            <Text>Top section menu bar</Text>
        </React.Fragment>
    );
};

export default ProfileTopSection;

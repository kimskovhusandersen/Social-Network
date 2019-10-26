import React from "react";

import { Image } from "./theme";

const ProfileImage = ({ profileImageUrl, toggleImageUploader }) => {
    return (
        <React.Fragment>
            <Image onClick={toggleImageUploader} src={profileImageUrl} />;
        </React.Fragment>
    );
};

export default ProfileImage;

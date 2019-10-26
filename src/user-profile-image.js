import React from "react";

import { PageWrapper, Image } from "./theme";

const ProfileImage = ({ profileImageUrl, toggleUploadImage }) => {
    return <Image onClick={toggleUploadImage} src={profileImageUrl} />;
};

export default ProfileImage;

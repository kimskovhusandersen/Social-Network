import React from "react";

import { Photo } from "./theme";

const ProfilePhoto = ({ profilePhotoUrl, toggle }) => {
    return (
        <React.Fragment>
            <Photo
                onClick={e => toggle(e, "isPhotoUploaderVisible")}
                src={profilePhotoUrl}
            />
        </React.Fragment>
    );
};

export default ProfilePhoto;

import React from "react";

import { Photo } from "./theme";

const ProfilePhoto = ({ url = "/default-avatar.jpg", toggle }) => {
    return (
        <React.Fragment>
            <Photo
                onClick={e => toggle(e, "isPhotoUploaderVisible")}
                src={url}
            />
        </React.Fragment>
    );
};

export default ProfilePhoto;

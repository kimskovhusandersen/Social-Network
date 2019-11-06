import React from "react";
import { useSelector } from "react-redux";

const ProfilesOnlineCount = () => {
    const profilesOnline = useSelector(state => state && state.profilesOnline);
    if (!profilesOnline) {
        return null;
    }
    return (
        <React.Fragment>
            {!!profilesOnline && profilesOnline.length}
        </React.Fragment>
    );
};

export default ProfilesOnlineCount;

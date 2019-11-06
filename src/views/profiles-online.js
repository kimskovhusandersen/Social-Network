import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const ProfilesOnlineCount = ({ profileId }) => {
    const profilesOnline = useSelector(
        state =>
            state &&
            state.profilesOnline.filter(
                profile => profile.id != profileId && profile
            )
    );
    const wrapper = useRef();

    useEffect(() => {
        let { clientHeight, scrollHeight } = wrapper.current;
        wrapper.current.scrollTop = scrollHeight - clientHeight;
    }, [profilesOnline]);

    const handleClick = profile => {
        console.log("HANDLE CLICK", profile.id);
    };

    if (!profilesOnline) {
        return null;
    }
    return (
        <React.Fragment>
            {profilesOnline &&
                profilesOnline.map(profile => (
                    <div
                        ref={wrapper}
                        key={profile.id}
                        onClick={() => handleClick(profile)}
                    >
                        {profile.firstName} {profile.lastName}
                    </div>
                ))}
        </React.Fragment>
    );
};

export default ProfilesOnlineCount;

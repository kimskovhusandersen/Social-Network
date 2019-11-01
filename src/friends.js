import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "./actions";
import FriendshipButton from "./friendship-button";

const Friends = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles);

    useEffect(() => {
        dispatch(getProfiles());
    }, []);

    if (!profiles) {
        return null;
    }

    return (
        <React.Fragment>
            {profiles.map(profile => (
                <div key={profile.id}>
                    {profile.firstName}
                    {profile.id !== null && (
                        <FriendshipButton otherProfileId={profile.id} />
                    )}
                </div>
            ))}
        </React.Fragment>
    );
};

export default Friends;

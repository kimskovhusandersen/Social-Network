import React from "react";
import FriendshipButton from "../friendship-button";

import classes from "./FindFriendsItem.module.css";

const FindFriendsItem = ({ profile }) => {
    if (!profile) {
        return null;
    }
    return (
        <div className={classes.StyledFindFriendItem}>
            <a>
                <img src={profile.url || "/default-avatar.jpg"} />
            </a>
            <div>
                <div>
                    <a href={`/user/${profile.id}`}>
                        <span className={classes.ProfileName}>
                            {profile.firstName} {profile.lastName}
                        </span>
                    </a>
                </div>
            </div>

            <div>
                <FriendshipButton otherProfileId={profile.id} />
                <a>Remove</a>
            </div>
        </div>
    );
};
export default FindFriendsItem;

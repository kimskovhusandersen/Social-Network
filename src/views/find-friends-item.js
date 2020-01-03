import React from "react";
import { StyledFindFriendItem, ProfileName } from "../style/find-friends-item";
import FriendshipButton from "../friendship-button";

const FindFriendsItem = ({ profile }) => {
    if (!profile) {
        return null;
    }
    return (
        <StyledFindFriendItem>
            <a>
                <img src={profile.url || "/default-avatar.jpg"} />
            </a>
            <div>
                <div>
                    <a href={`/user/${profile.id}`}>
                        <ProfileName>
                            {profile.firstName} {profile.lastName}
                        </ProfileName>
                    </a>
                </div>
            </div>

            <div>
                <FriendshipButton otherProfileId={profile.id} />
                <a>Remove</a>
            </div>
        </StyledFindFriendItem>
    );
};
export default FindFriendsItem;

import React from "react";
import {
    StyledFindFriendItem,
    ProfileName,
    FriendsName
} from "../style/find-friends-item";
import FriendshipButton from "../friendship-button";

const FindFriendsItem = ({ profile, friends, count }) => {
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
                {friends && (
                    <div>
                        <img src={friends.url} />
                        <a href={`/user/${friend.id}`}>
                            <FriendsName>
                                {friends.firstName} {friends.lastName}
                            </FriendsName>
                        </a>
                        &nbsp;and&nbsp; <a>{count} other friends</a>
                    </div>
                )}
            </div>
            <div>
                <FriendshipButton otherProfileId={profile.id} />
                <a>Remove</a>
            </div>
        </StyledFindFriendItem>
    );
};
export default FindFriendsItem;

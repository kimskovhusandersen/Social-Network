import React from "react";
import FriendshipButton from "../friendship-button";
import { StyledFriendsItem } from "../style/friends";

const FriendsItem = ({ friend }) => {
    if (!friend) {
        return null;
    }
    return (
        <StyledFriendsItem>
            <img src={friend.url || "/default-avatar.jpg"} />
            <div>
                <div>
                    <span>
                        <a href={`/user/${friend.id}`}>
                            {friend.firstName}&nbsp;
                            {friend.lastName}
                        </a>
                    </span>
                    <span>
                        <a>Number of friends</a>
                    </span>
                </div>
                <div>
                    <FriendshipButton otherProfileId={friend.id} />
                </div>
            </div>
        </StyledFriendsItem>
    );
};
export default FriendsItem;

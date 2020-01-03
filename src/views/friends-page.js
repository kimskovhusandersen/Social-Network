import React from "react";
import FriendshipButton from "../friendship-button";
import { StyledFriendsItem } from "../style/friends";
// Views
import FriendsItem from "./friends-item";
// Style
import { FriendsWrapper, FriendsHeader } from "../style/friends";
import { Search, Users } from "../style/icons";

const FriendsPage = ({ friendRequests, friends, searchForFriends }) => {
    if (!friends) {
        return null;
    }
    return (
        <FriendsWrapper>
            <FriendsHeader>
                <div>
                    <span>
                        <Users /> Friends
                    </span>
                    <span>
                        <a href="/find-friends">Find Friends</a>
                    </span>
                </div>
                <div>
                    <ul>
                        <li>
                            <a>All Friends</a>
                        </li>
                        <li>
                            <a>Birthdays</a>
                        </li>
                        <li>
                            <a>Work</a>
                        </li>
                        <li>
                            <a>University</a>
                        </li>
                        <li>
                            <a>Current City</a>
                        </li>
                        <li>
                            <a>Home Town</a>
                        </li>
                        <li>
                            <a>More</a>
                        </li>
                    </ul>
                    <div>
                        {searchForFriends}
                        <Search />
                    </div>
                </div>
            </FriendsHeader>
            {friendRequests}
            {friends}
        </FriendsWrapper>
    );
};
export default FriendsPage;

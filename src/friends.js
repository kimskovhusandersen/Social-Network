import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { getFriends } from "./actions";

import FriendsPage from "./views/friends-page";
import FriendsItem from "./views/friends-item";
import SearchForFriends from "./views/search-for-friends";
// Style
import { FriendsItemWrapper } from "./style/friends";

const Friends = ({ profileId }) => {
    const dispatch = useDispatch();
    const [friendsBySearch, setFriendsBySearch] = useState([]);
    const friendRequests = useSelector(
        state =>
            state &&
            state.friends &&
            state.friends.filter(friend => friend.accepted == false && friend)
    );
    const friends = useSelector(
        state =>
            state &&
            state.friends &&
            state.friends.filter(friend => friend.accepted == true && friend)
    );

    const friendsWrapper = useRef();

    const handleSearch = result => {
        setFriendsBySearch(result);
    };

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    useEffect(() => {
        if (friends) {
            let { clientHeight, scrollHeight } = friendsWrapper.current;
            friendsWrapper.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [friends]);

    if (!friends) {
        return null;
    }
    return (
        <React.Fragment>
            <FriendsPage
                searchForFriends={
                    <SearchForFriends
                        profileId={profileId}
                        callback={values => handleSearch(values)}
                        searchCategory={"friends"}
                    />
                }
                friends={
                    <FriendsItemWrapper ref={friendsWrapper}>
                        {!friendsBySearch || !friendsBySearch.length
                            ? !!friends &&
                              friends.map(friend => (
                                  <FriendsItem
                                      key={friend.id}
                                      friend={friend}
                                  />
                              ))
                            : !!friendsBySearch &&
                              friendsBySearch.map(friend => (
                                  <FriendsItem
                                      key={friend.id}
                                      friend={friend}
                                  />
                              ))}
                    </FriendsItemWrapper>
                }
                friendRequests={
                    <FriendsItemWrapper ref={friendsWrapper}>
                        {!!friendRequests &&
                            friendRequests.map(friend => (
                                <FriendsItem key={friend.id} friend={friend} />
                            ))}
                    </FriendsItemWrapper>
                }
            />
        </React.Fragment>
    );
};

export default Friends;

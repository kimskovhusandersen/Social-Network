import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../actions";
import FriendshipButton from "../friendship-button";
import { FriendsPageWrapper, PageItem } from "../style/theme";

const Friends = () => {
    const dispatch = useDispatch();
    const friendRequests = useSelector(
        state =>
            state.friends &&
            state.friends.filter(profile => profile.accepted == false)
    );
    const friends = useSelector(
        state =>
            state.friends &&
            state.friends.filter(profile => profile.accepted == true)
    );
    console.log(friends);
    useEffect(() => {
        dispatch(getFriends());
    }, []);

    if (!friendRequests || !friends) {
        return null;
    }

    return (
        <React.Fragment>
            {!friendRequests && <h1>No New Friend Requests</h1>}
            {!!friendRequests.length && <h1>Friend requests</h1>}
            <FriendsPageWrapper>
                {friendRequests &&
                    friendRequests.map(fr => (
                        <PageItem key={fr.id}>
                            <img
                                src={fr.url || "/default-avatar.jpg"}
                                widht="50px"
                                height="50px"
                            />
                            <a href={`/user/${fr.id}`}>
                                {fr.firstName} {fr.lastName}{" "}
                            </a>
                            {fr.id !== null && (
                                <FriendshipButton otherProfileId={fr.id} />
                            )}
                        </PageItem>
                    ))}
            </FriendsPageWrapper>
            {!!friends.length && <h1>Friends</h1>}
            <FriendsPageWrapper>
                {friends &&
                    friends.map(friend => (
                        <PageItem key={friend.id}>
                            <img
                                src={friend.url || "/default-avatar.jpg"}
                                widht="50px"
                                height="50px"
                            />
                            <a href={`/user/${friend.id}`}>
                                {friend.firstName} {friend.lastName}{" "}
                            </a>
                            {friend.id !== null && (
                                <FriendshipButton otherProfileId={friend.id} />
                            )}
                        </PageItem>
                    ))}
            </FriendsPageWrapper>
        </React.Fragment>
    );
};

export default Friends;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "./actions";
import FriendshipButton from "./friendship-button";

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
    useEffect(() => {
        dispatch(getFriends());
    }, []);

    if (!friendRequests || !friends) {
        return null;
    }

    return (
        <React.Fragment>
            {!!friendRequests.length && <h1>Friend requests</h1>}
            {friendRequests &&
                friendRequests.map(fr => (
                    <div key={fr.id}>
                        {fr.firstName} {fr.lastName}
                        {fr.id !== null && (
                            <FriendshipButton otherProfileId={fr.id} />
                        )}
                    </div>
                ))}
            {!!friends.length && <h1>Friends</h1>}
            {friends &&
                friends.map(friend => (
                    <div key={friend.id}>
                        {friend.firstName} {friend.lastName}
                        {friend.id !== null && (
                            <FriendshipButton otherProfileId={friend.id} />
                        )}
                    </div>
                ))}
        </React.Fragment>
    );
};

export default Friends;

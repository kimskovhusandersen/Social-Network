import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../actions";
import FriendshipButton from "../friendship-button";
import {
    PageWrapper,
    Page,
    FriendsPageWrapper,
    PageItem
} from "../style/theme";

const Friends = ({ hero }) => {
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
            {hero}
            <PageWrapper>
                <Page>
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
                                    {fr.firstName} {fr.lastName}
                                    {fr.id !== null && (
                                        <FriendshipButton
                                            otherProfileId={fr.id}
                                        />
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
                                        src={
                                            friend.url || "/default-avatar.jpg"
                                        }
                                        widht="50px"
                                        height="50px"
                                    />
                                    {friend.firstName} {friend.lastName}
                                    {friend.id !== null && (
                                        <FriendshipButton
                                            otherProfileId={friend.id}
                                        />
                                    )}
                                </PageItem>
                            ))}
                    </FriendsPageWrapper>
                </Page>
            </PageWrapper>
        </React.Fragment>
    );
};

export default Friends;

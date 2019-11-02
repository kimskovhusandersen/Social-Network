import { useFetchData } from "./helpers";

export const getFriends = async () => {
    let friends = await useFetchData("/api/friends");
    friends = friends && !Array.isArray(friends) ? [friends] : friends;
    return {
        type: "GET_FRIENDS",
        data: friends || []
    };
};

export const makeFriendRequest = async id => {
    const data = await useFetchData(`/api/friends/add`, {
        receiverId: id
    });
    const action = {
        type: "ADD_FRIEND_REQUESTS",
        data
    };
    return !data ? null : action;
};

export const deleteFriend = async id => {
    const data = await useFetchData(`/api/friends/delete`, {
        receiverId: id
    });
    const action = {
        type: "FILTER_FRIENDS",
        data: friends => friends.filter(friend => friend.id != id && friend)
    };
    return !data ? null : action;
};

export const acceptFriendRequest = async id => {
    const data = await useFetchData(`/api/friends/accept`, {
        senderId: id
    });
    const action = {
        type: "FILTER_FRIENDS",
        data: friends =>
            friends.map(friend => {
                if (friend.id == id) {
                    friend.accepted = true;
                }
                return friend;
            })
    };
    return !data ? null : action;
};

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

export const getPhotos = async () => {
    let photos = await useFetchData("/api/photos");
    photos = photos && !Array.isArray(photos) ? [photos] : photos;
    return {
        type: "GET_PHOTOS",
        data: photos || []
    };
};

export const getMessages = async () => {
    let messages = await useFetchData(`/api/messages`);
    console.log(messages);
    messages = messages && !Array.isArray(messages) ? [messages] : messages;
    return {
        type: "GET_MESSAGES",
        data: messages || []
    };
};

export const addMessage = async message => {
    return {
        type: "ADD_MESSAGES",
        data: messages => [message, ...messages]
    };
};

import { useFetchData } from "./helpers";

// Friends
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

// Photos
export const getPhotos = async () => {
    let photos = await useFetchData("/api/photos");
    photos = photos && !Array.isArray(photos) ? [photos] : photos;
    return {
        type: "GET_PHOTOS",
        data: photos || []
    };
};

// Messages
export const getMessages = async threadId => {
    console.log("getMessages INVOKED", threadId);
    let messages = await useFetchData(`/api/threads/${threadId}/messages`);
    messages = messages && !Array.isArray(messages) ? [messages] : messages;
    return {
        type: "GET_MESSAGES",
        data: messages || []
    };
};

export const addMessage = async message => {
    return {
        type: "ADD_MESSAGES",
        data: messages => [...messages, message]
    };
};

// Profiles
export const addProfilesOnline = async profilesOnlineIds => {
    const profilesOnline = await useFetchData(`/api/profiles-online`, {
        profilesOnlineIds
    });
    return {
        type: "UPDATE_PROFILES_ONLINE",
        data: values => {
            return Array.isArray(values)
                ? [profilesOnline, ...values]
                : profilesOnline;
        }
    };
};

// Threads

export const addThread = async thread => {
    return {
        type: "ADD_THREADS",
        data: threads => [thread, ...threads]
    };
};

export const getThreads = async () => {
    let threads = await useFetchData(`/api/threads`);
    threads = threads && !Array.isArray(threads) ? [threads] : threads;
    return {
        type: "GET_THREADS",
        data: threads || []
    };
};

export const getThread = async threadId => {
    let thread = await useFetchData(`/api/threads/${threadId}`);
    thread = thread && !Array.isArray(thread) ? [thread] : thread;
    return {
        type: "GET_THREAD",
        data: thread
    };
};

export const setSelectedThread = async threadId => {
    console.log("setSelectedThread INVOKED", threadId);
    return {
        type: "SET_SELECTED_THREAD",
        data: threadId
    };
};

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

export const makeFriendRequest = async data => {
    return {
        type: "ADD_FRIEND_REQUESTS",
        data
    };
};

export const deleteFriend = async id => {
    return {
        type: "FILTER_FRIENDS",
        data: friends => friends.filter(friend => friend.id != id && friend)
    };
};

export const acceptFriendRequest = async id => {
    return {
        type: "FILTER_FRIENDS",
        data: friends =>
            friends.map(friend => {
                if (friend.id == id) {
                    friend.accepted = true;
                }
                return friend;
            })
    };
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
    console.log("GET MESSAGES IN ACTION", threadId);
    let messages = await useFetchData(`/api/threads/${threadId}/messages`);
    console.log("IN ACTION", messages);
    messages = messages && !Array.isArray(messages) ? [messages] : messages;
    return {
        type: "GET_MESSAGES",
        data: messages || []
    };
};

export const addMessage = async message => {
    console.log("IN ACTIO", message);
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
    return {
        type: "SET_SELECTED_THREAD",
        data: threadId
    };
};

import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const fetchFriendsLoading = () => {
    return {
        type: actionTypes.FETCH_FRIENDS_LOADING
    };
};

const fetchFriendsSuccess = friends => {
    return {
        type: actionTypes.FETCH_FRIENDS_SUCCESS,
        friends
    };
};

const fetchFriendsFailed = error => {
    return {
        type: actionTypes.FETCH_FRIENDS_FAILED,
        error
    };
};

const addFriendLoading = () => {
    return {
        type: actionTypes.ADD_FRIEND_LOADING
    };
};
const addFriendSuccess = (id, friend) => {
    return {
        type: actionTypes.ADD_FRIEND_SUCCESS,
        id,
        friend
    };
};

const addFriendFailed = error => {
    return {
        type: actionTypes.ADD_FRIEND_FAILED,
        error
    };
};

const acceptFriendLoading = () => {
    return {
        type: actionTypes.ACCEPT_FRIEND_LOADING
    };
};
const acceptFriendSuccess = (id, friend) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_SUCCESS,
        id,
        friend
    };
};

const acceptFriendFailed = error => {
    return {
        type: actionTypes.ACCEPT_FRIEND_FAILED,
        error
    };
};

const deleteFriendLoading = () => {
    return {
        type: actionTypes.DELETE_FRIEND_LOADING
    };
};

const deleteFriendSuccess = (id, friend) => {
    return {
        type: actionTypes.DELETE_FRIEND_SUCCESS,
        id,
        friend
    };
};

const deleteFriendFailed = error => {
    return {
        type: actionTypes.DELETE_FRIEND_FAILED,
        error
    };
};
const updateMostRecentProfilesSuccess = (id, friend) => {
    return {
        type: actionTypes.UPDATE_MOST_RECENT_PROFILES_SUCCESS,
        id,
        friend
    };
};

export const fetchFriends = () => {
    return dispatch => {
        dispatch(fetchFriendsLoading());
        axios
            .get("/api/friends")
            .then(({ data }) => {
                dispatch(fetchFriendsSuccess(data)); //data.name holds the id of the order
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchFriendsFailed(error));
            });
    };
};

export const addFriend = profileId => {
    return dispatch => {
        dispatch(addFriendLoading());
        axios
            .post("/api/friends", {
                receiverId: profileId
            })
            .then(({ data }) => {
                dispatch(addFriendSuccess(data[0].id, data[0]));
                dispatch(updateMostRecentProfilesSuccess(data[0].id, data[0]));
            })
            .catch(error => {
                console.log(error);
                dispatch(addFriendFailed(error));
            });
    };
};

export const acceptFriend = profileId => {
    return dispatch => {
        dispatch(acceptFriendLoading());
        axios
            .post(`/api/friends/accept`, {
                senderId: profileId
            })
            .then(({ data }) => {
                dispatch(acceptFriendSuccess(data[0].id, data[0]));
                dispatch(updateMostRecentProfilesSuccess(data[0].id, data[0]));
            })
            .catch(error => {
                console.log(error);
                dispatch(acceptFriendFailed(error));
            });
    };
};

export const deleteFriend = profileId => {
    return dispatch => {
        dispatch(deleteFriendLoading());
        axios
            .post(`/api/friends/delete`, {
                receiverId: profileId
            })
            .then(({ data }) => {
                dispatch(deleteFriendSuccess(data[0].id, data[0]));
                dispatch(updateMostRecentProfilesSuccess(data[0].id, data[0]));
            })
            .catch(error => {
                console.log(error);
                dispatch(deleteFriendFailed(error));
            });
    };
};

// Socket.io
export const addFriendRequest = friend => {
    return dispatch => {
        dispatch(addFriendSuccess(friend[0].id, friend[0]));
        dispatch(updateMostRecentProfilesSuccess(friend[0].id, friend[0]));
    };
};
export const acceptFriendRequest = friend => {
    return dispatch => {
        dispatch(acceptFriendSuccess(friend[0].id, friend[0]));
        dispatch(updateMostRecentProfilesSuccess(friend[0].id, friend[0]));
    };
};
export const deleteFriendRequest = friend => {
    return dispatch => {
        dispatch(deleteFriendSuccess(friend[0].id, friend[0]));
        dispatch(updateMostRecentProfilesSuccess(friend[0].id, friend[0]));
    };
};

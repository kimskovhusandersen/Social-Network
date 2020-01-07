import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const fetchFriendsSuccess = friends => {
    return {
        type: actionTypes.FETCH_FRIENDS_SUCCESS,
        friends
    };
};

const fetchFriendsFailed = () => {
    return {
        type: actionTypes.FETCH_FRIENDS_FAILED
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
    console.log(error);
    return;
};

export const makeFriendRequest = () => {
    console.log("making friendRequest");
};

export const addFriend = friend => {
    return dispatch => {
        axios
            .post("/api/friends", friend)
            .then(({ data }) => {
                dispatch(addFriendSuccess(data[0].id, data[0])); //data.name holds the id of the order
            })
            .catch(error => {
                dispatch(addFriendFailed(error));
            });
    };
};

export const fetchFriends = () => {
    return dispatch => {
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

export const deleteFriend = profileId => {
    return dispatch => {
        axios
            .post(`/api/friends/${profileId}/delete`)
            .then(({ data }) => {
                dispatch(addFriendSuccess(data[0].id, data[0])); //data.name holds the id of the order
            })
            .catch(error => {
                dispatch(addFriendFailed(error));
            });
    };
};

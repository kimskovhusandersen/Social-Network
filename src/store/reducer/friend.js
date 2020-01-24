import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";
import { kebabObjToCamel } from "../../helpers.js";

const initialState = {
    friends: [],
    friendRequests: [],
    loading: false,
    error: false
};

const fetchFriendsSuccess = (state, action) => {
    let friends = [];
    action.friends.map(friend => friends.push(kebabObjToCamel(friend)));
    return updateObject(state, {
        friends,
        loading: false,
        error: false
    });
};

const fetchFriendRequestsSuccess = (state, action) => {
    return updateObject(state, {
        friendRequests: action.friendRequests,
        loading: false,
        error: false
    });
};

const addFriendSuccess = (state, action) => {
    let friend = kebabObjToCamel(action.friend);
    const newFriend = updateObject(friend, {
        id: action.id
    });
    return updateObject(state, {
        friends: [newFriend, ...state.friends],
        loading: false,
        error: false
    });
};

const addFriendRequestSuccess = (state, action) => {
    const newFriendRequest = updateObject(action.friend, { id: action.id });
    return updateObject(state, {
        friendRequests: [newFriendRequest, ...state.friendRequests],
        loading: false,
        error: false
    });
};

const acceptFriendSuccess = (state, action) => {
    const updatedFriendRequests = state.friendRequests.filter(
        friend => friend.id !== action.friend.id
    );
    const updatedFriends = [...state.friends, action.friend];
    return updateObject(state, {
        friends: updatedFriends,
        friendRequests: updatedFriendRequests,
        loading: false,
        error: false
    });
};

const deleteFriendSuccess = (state, action) => {
    const updatedFriends = state.friends.filter(
        friend => friend.id !== action.friend.id
    );
    const updatedFriendRequests = state.friendRequests.filter(
        friend => friend.id !== action.friend.id
    );
    return updateObject(state, {
        friends: updatedFriends,
        friendRequests: updatedFriendRequests,
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FRIENDS_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_FRIENDS_SUCCESS:
            return fetchFriendsSuccess(state, action);
        case actionTypes.FETCH_FRIENDS_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.FETCH_FRIEND_REQUESTS_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_FRIENDS_REQUESTS_SUCCESS:
            return fetchFriendRequestsSuccess(state, action);
        case actionTypes.FETCH_FRIEND_REQUESTS_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.ADD_FRIEND_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_FRIEND_SUCCESS:
            return addFriendSuccess(state, action);
        case actionTypes.ADD_FRIEND_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.ADD_FRIEND_REQUEST_SUCCESS:
            return addFriendRequestSuccess(state, action);

        case actionTypes.ACCEPT_FRIEND_SUCCESS:
            return acceptFriendSuccess(state, action);

        case actionTypes.DELETE_FRIEND_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.DELETE_FRIEND_SUCCESS:
            return deleteFriendSuccess(state, action);
        case actionTypes.DELETE_FRIEND_FAILED:
            return updateObject(state, { error: true, loading: false });
        default:
            return state;
    }
};

export default reducer;

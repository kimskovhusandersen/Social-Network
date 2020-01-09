import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    friends: [],
    loading: false,
    error: false
};

const fetchFriendsSuccess = (state, action) => {
    return updateObject(state, {
        friends: action.friends,
        loading: false,
        error: false
    });
};

const addFriendSuccess = (state, action) => {
    const newFriend = updateObject(action.friend, { id: action.id });
    return updateObject(state, {
        friends: [newFriend, ...state.friends],
        loading: false,
        error: false
    });
};

const acceptFriendSuccess = (state, action) => {
    let updatedFriend = action.friend;
    let updatedFriends = state.friends.map(friend => {
        return friend.id === updatedFriend.id ? updatedFriend : friend;
    });
    return updateObject(state, {
        friends: updatedFriends,
        loading: false,
        error: false
    });
};

const deleteFriendSuccess = (state, action) => {
    let friends = state.friends.filter(
        friend => friend.id !== action.friend.id
    );
    return updateObject(state, {
        friends,
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

        case actionTypes.ADD_FRIEND_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_FRIEND_SUCCESS:
            return addFriendSuccess(state, action);
        case actionTypes.ADD_FRIEND_FAILED:
            return updateObject(state, { error: true, loading: false });

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

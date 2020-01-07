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
        friends: [newFriend, ...state.friends]
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FRIENDS_SUCCESS:
            return fetchFriendsSuccess(state, action);
        case actionTypes.FETCH_FRIENDS_FAILED:
            return updateObject(state, { error: true, loading: false });
        case actionTypes.ADD_FRIEND_SUCCESS:
            return addFriendSuccess(state, action);
        case actionTypes.ADD_FRIEND_FAILED:
            return updateObject(state, { error: true, loading: false });
        default:
            return state;
    }
};

export default reducer;

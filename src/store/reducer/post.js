import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    posts: [],
    loading: false,
    error: false
};

const fetchPostsSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        loading: false,
        error: false
    });
};

const addPostSuccess = (state, action) => {
    const newPost = updateObject(action.post, { id: action.id });
    return updateObject(state, {
        posts: [newPost, ...state.posts],
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_POSTS_SUCCESS:
            return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.ADD_POSTS_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_POST_SUCCESS:
            return addPostSuccess(state, action);
        case actionTypes.ADD_POST_FAILED:
            return updateObject(state, { error: true, loading: false });

        default:
            return state;
    }
};

export default reducer;

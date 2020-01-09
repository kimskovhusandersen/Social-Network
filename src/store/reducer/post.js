import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    posts: [],
    loading: false,
    error: false
};

const fetchPostsSuccess = (state, action) => {
    console.log("fetchPostsSuccess", action.posts);
    return updateObject(state, {
        posts: action.posts,
        loading: false,
        error: false
    });
};

const addPostSuccess = (state, action) => {
    const newPost = updateObject(action.post, { id: action.id });
    console.log(newPost, state.posts);
    return updateObject(state, {
        posts: [newPost, ...state.posts]
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_SUCCESS:
            return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAILED:
            return updateObject(state, { error: true, loading: false });
        case actionTypes.ADD_POST_SUCCESS:
            return addPostSuccess(state, action);
        case actionTypes.ADD_POST_FAILED:
            return updateObject(state, { error: true, loading: false });

        default:
            return state;
    }
};

export default reducer;

import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    posts: [],
    loading: false
};

const createPostSuccess = (state, action) => {
    console.log(action.id);
    const newPost = updateObject(action.post, { id: action.id });
    return updateObject(state, {
        posts: [...state.posts, newPost]
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_POST_SUCCESS:
            return createPostSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;

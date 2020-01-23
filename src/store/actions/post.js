import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const fetchPostsLoading = () => {
    return {
        type: actionTypes.FETCH_POSTS_LOADING
    };
};
const fetchPostsSuccess = posts => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts
    };
};

const fetchPostsFailed = error => {
    return {
        type: actionTypes.FETCH_POSTS_FAILED,
        error
    };
};

const addPostLoading = () => {
    return {
        type: actionTypes.ADD_POST_LOADING
    };
};

export const addPostSuccess = (id, post) => {
    return {
        type: actionTypes.ADD_POST_SUCCESS,
        id,
        post
    };
};

const addPostFailed = error => {
    return {
        type: actionTypes.ADD_POST_FAILED,
        error
    };
};

export const fetchPosts = () => {
    return dispatch => {
        dispatch(fetchPostsLoading());
        axios
            .get("/api/posts")
            .then(({ data }) => {
                dispatch(fetchPostsSuccess(data)); //data.name holds the id of the order
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchPostsFailed(error));
            });
    };
};

export const addPost = post => {
    console.log("[post.js action]", post);
    return dispatch => {
        dispatch(addPostLoading());
        axios
            .post("/api/posts", post)
            .then(({ data }) => {
                dispatch(addPostSuccess(data[0].id, data[0])); //data.name holds the id of the order
            })
            .catch(error => {
                dispatch(addPostFailed(error));
            });
    };
};

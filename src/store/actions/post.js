import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const fetchPostsSuccess = posts => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts
    };
};

const fetchPostsFailed = () => {
    return {
        type: actionTypes.FETCH_POSTS_FAILED
    };
};

const addPostSuccess = (id, post) => {
    return {
        type: actionTypes.ADD_POST_SUCCESS,
        id,
        post
    };
};

const addPostFailed = error => {
    console.log(error);
    return;
};

export const addPost = post => {
    return dispatch => {
        axios
            .post("/api/posts", post)
            .then(({ data }) => {
                console.log(data);
                dispatch(addPostSuccess(data[0].id, data[0])); //data.name holds the id of the order
            })
            .catch(error => {
                dispatch(addPostFailed(error));
            });
    };
};

export const fetchPosts = () => {
    return dispatch => {
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

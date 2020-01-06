import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const createPostSuccess = (id, order) => {
    return {
        type: actionTypes.CREATE_POST_SUCCESS,
        id,
        order
    };
};

const createPostFailed = error => {
    console.log(error);
    return;
};

export const createPost = post => {
    return dispatch => {
        axios
            .post("/api/posts", post)
            .then(({ data }) => {
                console.log(data);
                dispatch(createPostSuccess(data.id, post)); //data.name holds the id of the order
            })
            .catch(error => {
                dispatch(createPostFailed(error));
            });
    };
};

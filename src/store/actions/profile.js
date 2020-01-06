import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf.js";
const fetchProfileSuccess = profile => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profile
    };
};

const fetchProfileFailed = () => {
    return {
        type: actionTypes.FETCH_PROFILE_FAILED
    };
};

export const fetchProfile = () => {
    return dispatch => {
        axios
            .get("/api/my-profile")
            .then(({ data }) => {
                console.log(data);
                dispatch(fetchProfileSuccess(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchProfileFailed());
            });
    };
};

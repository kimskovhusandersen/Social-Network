import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf.js";

const fetchOtherProfileLoading = () => {
    return {
        type: actionTypes.FETCH_OTHER_PROFILE_LOADING
    };
};

const fetchOtherProfileSuccess = otherProfile => {
    return {
        type: actionTypes.FETCH_OTHER_PROFILE_SUCCESS,
        otherProfile
    };
};

const fetchOtherProfileFailed = () => {
    return {
        type: actionTypes.FETCH_OTHER_PROFILE_FAILED
    };
};

export const fetchOtherProfile = otherProfileId => {
    return dispatch => {
        dispatch(fetchOtherProfileLoading());
        axios
            .get(`/api/profiles/${otherProfileId}`)
            .then(({ data }) => {
                dispatch(fetchOtherProfileSuccess(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOtherProfileFailed());
            });
    };
};

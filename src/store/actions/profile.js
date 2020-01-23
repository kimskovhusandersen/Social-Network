import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf.js";

const fecthProfileLoading = () => {
    return {
        type: actionTypes.FETCH_PROFILE_LOADING
    };
};

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
        dispatch(fecthProfileLoading());
        axios
            .get("/api/my-profile")
            .then(({ data }) => {
                dispatch(fetchProfileSuccess(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchProfileFailed());
            });
    };
};

const fetchMostRecentProfilesLoading = () => {
    return {
        type: actionTypes.FETCH_MOST_RECENT_PROFILES_LOADING
    };
};

const fetchMostRecentProfilesSuccess = mostRecentProfiles => {
    return {
        type: actionTypes.FETCH_MOST_RECENT_PROFILES_SUCCESS,
        mostRecentProfiles
    };
};

const fetchMostRecentProfilesFailed = () => {
    return {
        type: actionTypes.FETCH_MOST_RECENT_PROFILES_FAILED
    };
};

export const fetchMostRecentProfiles = () => {
    return dispatch => {
        dispatch(fetchMostRecentProfilesLoading());
        axios
            .get("/api/recent-profiles")
            .then(({ data }) => {
                dispatch(fetchMostRecentProfilesSuccess(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchMostRecentProfilesFailed());
            });
    };
};

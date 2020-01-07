import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    profile: null,
    mostRecentProfiles: null,
    loading: false,
    error: false
};

const fetchProfileSuccess = (state, action) => {
    return updateObject(state, {
        profile: action.profile[0],
        loading: false,
        error: false
    });
};
const fetchMostRecentProfilesSuccess = (state, action) => {
    return updateObject(state, {
        mostRecentProfiles: action.mostRecentProfiles,
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return fetchProfileSuccess(state, action);
        case actionTypes.FETCH_PROFILE_FAILED:
            return updateObject(state, { error: true, loading: false });
        case actionTypes.FETCH_MOST_RECENT_PROFILES_SUCCESS:
            return fetchMostRecentProfilesSuccess(state, action);
        case actionTypes.FETCH_MOST_RECENT_PROFILES_FAILED:
            return updateObject(state, { error: true, loading: false });
        default:
            return state;
    }
};

export default reducer;

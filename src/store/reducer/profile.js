import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";
import { kebabObjToCamel } from "../../helpers.js";

const initialState = {
    profile: null,
    mostRecentProfiles: null,
    loading: false,
    error: false
};

const fetchProfileSuccess = (state, action) => {
    let profile = kebabObjToCamel(action.profile[0]);
    return updateObject(state, {
        profile,
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
const updateMostRecentProfilesSuccess = (state, action) => {
    let updatedProfile = action.friend;
    let updatedMostRecentProfiles = state.mostRecentProfiles.map(profile => {
        return profile.id === updatedProfile.id ? updatedProfile : profile;
    });
    return updateObject(state, {
        mostRecentProfiles: updatedMostRecentProfiles,
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return fetchProfileSuccess(state, action);
        case actionTypes.FETCH_PROFILE_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.FETCH_MOST_RECENT_PROFILE_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_MOST_RECENT_PROFILES_SUCCESS:
            return fetchMostRecentProfilesSuccess(state, action);
        case actionTypes.FETCH_MOST_RECENT_PROFILES_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.UPDATE_MOST_RECENT_PROFILES_SUCCESS:
            return updateMostRecentProfilesSuccess(state, action);

        default:
            return state;
    }
};

export default reducer;

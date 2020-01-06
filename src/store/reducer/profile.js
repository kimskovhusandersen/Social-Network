import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    profile: null
};

const fetchProfileSuccess = (state, action) => {
    return updateObject(state, {
        profile: action.profile[0]
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return fetchProfileSuccess(state, action);
        case actionTypes.FETCH_PROFILE_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default reducer;

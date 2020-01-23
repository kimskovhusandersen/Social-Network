import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";
import { kebabObjToCamel } from "../../helpers.js";

const initialState = {
    profile: null,
    loading: false,
    error: false
};

const fetchOtherProfileSuccess = (state, action) => {
    let profile = kebabObjToCamel(action.otherProfile[0]);
    return updateObject(state, {
        profile,
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_OTHER_PROFILE_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_OTHER_PROFILE_SUCCESS:
            return fetchOtherProfileSuccess(state, action);
        case actionTypes.FETCH_OTHER_PROFILE_FAILED:
            return updateObject(state, { error: true, loading: false });

        default:
            return state;
    }
};

export default reducer;

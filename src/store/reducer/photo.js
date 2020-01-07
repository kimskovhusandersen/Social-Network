import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    photos: [],
    profilePhotoUrl: "/default-avatar.jpg",
    loading: false,
    error: false
};

const fetchPhotosSuccess = (state, action) => {
    let profilePhotoUrl = "/default-avatar.jpg";
    if (action.photos) {
        let profilePhoto = action.photos.find(
            photo => photo.album === "profile_photos"
        );
        if (profilePhoto) {
            profilePhotoUrl = profilePhoto.url;
        }
    }
    return updateObject(state, {
        photos: action.photos,
        profilePhotoUrl,
        loading: false,
        error: false
    });
};

const addPhotoSuccess = (state, action) => {
    const newPhoto = updateObject(action.photo, { id: action.id });
    return updateObject(state, {
        photos: [...state.photos, newPhoto]
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PHOTOS_SUCCESS:
            return fetchPhotosSuccess(state, action);
        case actionTypes.FETCH_PHOTOS_FAILED:
            return updateObject(state, { error: true });
        case actionTypes.ADD_PHOTO_SUCCESS:
            return addPhotoSuccess(state, action);
        case actionTypes.ADD_PHOTO_FAILED:
            return updateObject(state, { error: true, loading: false });
        default:
            return state;
    }
};

export default reducer;

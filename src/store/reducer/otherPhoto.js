import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    photos: {
        profile_photos: [
            {
                id: Math.floor(Math.random() * 100000 + 1),
                url: "/default-avatar.jpg"
            }
        ]
    },
    loading: false,
    error: false
};

const fetchOtherPhotosSuccess = (state, action) => {
    let photos = {};
    action.photos.forEach(photo => {
        if (photos[photo.album]) {
            photos[photo.album] = [...photos[photo.album], photo];
        } else {
            photos[photo.album] = [photo];
        }
    });

    if (photos.profile_photos.length === 0) {
        photos.profile_photos = [
            {
                id: Math.floor(Math.random() * 100000 + 1),
                url: "/default-avatar.jpg"
            }
        ];
    }

    return updateObject(state, {
        photos,
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_OTHER_PHOTOS_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_OTHER_PHOTOS_SUCCESS:
            return fetchOtherPhotosSuccess(state, action);
        case actionTypes.FETCH_OTHER_PHOTOS_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.ADD_OTHER_PHOTO_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_OTHER_PHOTO_SUCCESS:
            return addOtherPhotoSuccess(state, action);
        case actionTypes.ADD_OTHER_PHOTO_FAILED:
            return updateObject(state, { error: true, loading: false });
        default:
            return state;
    }
};

export default reducer;

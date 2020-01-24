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

const fetchPhotosSuccess = (state, action) => {
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

const addPhotoSuccess = (state, action) => {
    return updateObject(state, {
        photos: {
            ...state.photos,
            [action.photo[0].album]: [
                action.photo[0],
                ...state.photos[action.photo[0].album]
            ]
        },
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PHOTOS_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_PHOTOS_SUCCESS:
            return fetchPhotosSuccess(state, action);
        case actionTypes.FETCH_PHOTOS_FAILED:
            return updateObject(state, { error: true, loading: false });

        case actionTypes.ADD_PHOTO_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_PHOTO_SUCCESS:
            return addPhotoSuccess(state, action);
        case actionTypes.ADD_PHOTO_FAILED:
            return updateObject(state, { error: true, loading: false });
        default:
            return state;
    }
};

export default reducer;

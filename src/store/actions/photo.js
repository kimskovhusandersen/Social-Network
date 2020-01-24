import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const fetchPhotosLoading = () => {
    return {
        type: actionTypes.FETCH_PHOTOS_LOADING
    };
};

const fetchPhotosSuccess = photos => {
    return {
        type: actionTypes.FETCH_PHOTOS_SUCCESS,
        photos
    };
};

const fetchPhotosFailed = error => {
    return {
        type: actionTypes.FETCH_PHOTOS_FAILED,
        error
    };
};

const addPhotoLoading = () => {
    return {
        type: actionTypes.ADD_PHOTO_LOADING
    };
};

export const addPhotoSuccess = (id, photo) => {
    return {
        type: actionTypes.ADD_PHOTO_SUCCESS,
        id,
        photo
    };
};

const addPhotoFailed = error => {
    return {
        type: actionTypes.ADD_PHOTOS_FAILED,
        error
    };
};

export const addPhoto = photo => {
    return dispatch => {
        dispatch(addPhotoLoading());
        axios
            .post("/api/photos", photo)
            .then(({ data }) => {
                // will be taken care of by [socket.js]
            })
            .catch(error => {
                dispatch(addPhotoFailed(error));
            });
    };
};

export const fetchPhotos = () => {
    return dispatch => {
        dispatch(fetchPhotosLoading());
        axios
            .get("/api/my-photos")
            .then(({ data }) => {
                dispatch(fetchPhotosSuccess(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchPhotosFailed(error));
            });
    };
};

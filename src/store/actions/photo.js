import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const fetchPhotosSuccess = photos => {
    return {
        type: actionTypes.FETCH_PHOTOS_SUCCESS,
        photos
    };
};

const fetchPhotosFailed = () => {
    return {
        type: actionTypes.FETCH_PHOTOS_FAILED
    };
};

const addPhotoSuccess = (id, order) => {
    return {
        type: actionTypes.ADD_PHOTO_SUCCESS,
        id,
        order
    };
};

const addPhotoFailed = error => {
    console.log(error);
    return;
};

export const addPhoto = photo => {
    return dispatch => {
        axios
            .post("/api/photos", photo)
            .then(({ data }) => {
                dispatch(addPhotoSuccess(data.id, photo)); //data.name holds the id of the order
            })
            .catch(error => {
                dispatch(addPhotoFailed(error));
            });
    };
};

export const fetchPhotos = () => {
    return dispatch => {
        axios
            .get("/api/photos")
            .then(({ data }) => {
                dispatch(fetchPhotosSuccess(data)); //data.name holds the id of the order
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchPhotosFailed(error));
            });
    };
};

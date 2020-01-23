import * as actionTypes from "./actionTypes";
import axios from "../../axios_csurf";

const fetchOtherPhotosLoading = photos => {
    return {
        type: actionTypes.FETCH_OTHER_PHOTOS_LOADING,
        photos
    };
};

const fetchOtherPhotosSuccess = photos => {
    return {
        type: actionTypes.FETCH_OTHER_PHOTOS_SUCCESS,
        photos
    };
};

const fetchOtherPhotosFailed = () => {
    return {
        type: actionTypes.FETCH_OTHER_PHOTOS_FAILED
    };
};

export const fetchOtherPhotos = otherProfileId => {
    return dispatch => {
        dispatch(fetchOtherPhotosLoading);
        axios
            .get(`/api/photos/${otherProfileId}`)
            .then(({ data }) => {
                dispatch(fetchOtherPhotosSuccess(data)); //data.name holds the id of the order
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOtherPhotosFailed(error));
            });
    };
};

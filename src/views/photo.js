import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions";
import {
    ShowPhotoWrapper,
    ShowPhoto,
    PhotoWrapper,
    CommentsWrapper,
    CommentsHeader,
    Comments,
    Comment
} from "../style/show-photo";

const Photo = ({ match, profile }) => {
    const dispatch = useDispatch();
    const photo = useSelector(
        state =>
            state.photos &&
            state.photos.filter(photo => photo.id == match.params.id)
    );
    useEffect(() => {
        dispatch(getPhotos());
    }, []);

    if (!photo) {
        return null;
    }
    console.log("PHOTO?", photo);
    return (
        <React.Fragment>
            <ShowPhotoWrapper>
                <ShowPhoto>
                    <PhotoWrapper>
                        <a>
                            <span>icon</span>
                        </a>
                        <img src={photo[0].url} />
                        <a>
                            <span>icon</span>
                        </a>
                    </PhotoWrapper>
                    <CommentsWrapper>
                        <CommentsHeader>
                            <img src={profile.url || "/default-avatar.jpg"} />{" "}
                            {profile.firstName} {profile.lastName}
                            {moment("20111031", "YYYYMMDD").fromNow()}
                            <input
                                type="text"
                                name="comment"
                                required
                                placeholder="Write a comment.."
                            />
                        </CommentsHeader>
                    </CommentsWrapper>
                </ShowPhoto>
            </ShowPhotoWrapper>
        </React.Fragment>
    );
};

export default Photo;

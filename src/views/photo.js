import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions";
import RelativeTime from "./relative-time";

import {
    ShowPhotoWrapper,
    Close,
    ShowPhoto,
    PhotoWrapper,
    CommentsWrapper,
    CommentsHeader,
    Caption,
    LikeCommentShare,
    WriteComment,
    Comments,
    Comment
} from "../style/show-photo";
import {
    CornerUpRight,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    ThumbsUp,
    X
} from "../style/icons";

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

    return (
        <React.Fragment>
            <ShowPhotoWrapper>
                <Close>
                    <X color="ghostwhite" strokeWidth="2" />
                </Close>
                <ShowPhoto>
                    <PhotoWrapper>
                        <span>
                            <a>
                                <ChevronLeft
                                    color="ghostwhite"
                                    strokeWidth="2"
                                    height="100%"
                                />
                            </a>
                        </span>
                        <img src={photo[0].url} />
                        <span>
                            <a>
                                <ChevronRight
                                    color="ghostwhite"
                                    strokeWidth="2"
                                    height="100%"
                                />
                            </a>
                        </span>
                    </PhotoWrapper>
                    <CommentsWrapper>
                        <CommentsHeader>
                            <img src={profile.url || "/default-avatar.jpg"} />{" "}
                            <div>
                                <span>
                                    <a href="/">
                                        {profile.firstName} {profile.lastName}
                                    </a>
                                </span>
                                <span>
                                    <RelativeTime
                                        timestamp={photo[0].createdAt}
                                    />
                                </span>
                            </div>
                        </CommentsHeader>
                        <Caption>{photo[0].caption}</Caption>
                        <LikeCommentShare>
                            <ul>
                                <li>
                                    <a>
                                        <ThumbsUp color="#444" /> Like
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <MessageSquare color="#444" /> Comment
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <CornerUpRight color="#444" /> Share
                                    </a>
                                </li>
                            </ul>
                        </LikeCommentShare>
                        <WriteComment>
                            <img src={profile.url || "/default-avatar.jpg"} />{" "}
                            <input
                                type="text"
                                name="comment"
                                required
                                placeholder="Write a comment.."
                            />
                        </WriteComment>
                        <Comments></Comments>
                    </CommentsWrapper>
                </ShowPhoto>
            </ShowPhotoWrapper>
        </React.Fragment>
    );
};

export default Photo;

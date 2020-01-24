import React from "react";
import classes from "./Post.module.css";

import LikeCommentShare from "../../LikeCommentShare/LikeCommentShare";
import RelativeTime from "../../UI/RelativeTime/RelativeTime";
import ProfilePhoto from "../../ProfilePhoto/ProfilePhoto";

const Post = props => {
    let post = null;
    if (props.post) {
        post = (
            <div className={classes.Post}>
                <div className={classes.PostHeader}>
                    <div className={classes.ProfilePhoto}>
                        <ProfilePhoto
                            src={props.post.url}
                            alt={props.post.firstName}
                        />
                    </div>

                    <div className={classes.NameDateWrapper}>
                        <div className={classes.Name}>
                            {props.post.firstName} {props.post.middleName}{" "}
                            {props.post.lastName}
                        </div>
                        <div>
                            <RelativeTime timestamp={props.post.createdAt} />
                        </div>
                    </div>
                </div>
                <div className={classes.PostBody}>{props.post.body}</div>
                <div className={classes.PostFooter}>
                    <LikeCommentShare />
                </div>
            </div>
        );
    }

    return post;
};

export default Post;

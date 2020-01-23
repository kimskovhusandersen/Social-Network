import React from "react";
import classes from "./Post.module.css";

import LikeCommentShare from "../LikeCommentShare/LikeCommentShare";
import RelativeTime from "../UI/RelativeTime/RelativeTime";

const Post = props => {
    let post = null;
    if (props.post) {
        post = (
            <div className={classes.Post}>
                <div className={classes.PostHeader}>
                    <div className={classes.ProfilePhoto}>
                        <img src={props.post.url} alt={props.post.first_name} />
                    </div>

                    <div className={classes.NameDateWrapper}>
                        <div className={classes.Name}>
                            {props.post.first_name} {props.post.middle_name}{" "}
                            {props.post.last_name}
                        </div>
                        <div>
                            <RelativeTime timestamp={props.post.created_at} />
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

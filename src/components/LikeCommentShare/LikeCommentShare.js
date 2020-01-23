import React from "react";
import classes from "./LikeCommentShare.module.css";
import { CornerUpRight, MessageSquare, ThumbsUp } from "../../style/icons";

const LikeCommentShare = () => (
    <div className={classes.LikeCommentShare}>
        <span>
            <a>
                <ThumbsUp color="#444" /> Like
            </a>
        </span>
        <span>
            <a>
                <MessageSquare color="#444" /> Comment
            </a>
        </span>
        <span>
            <a>
                <CornerUpRight color="#444" /> Share
            </a>
        </span>
    </div>
);

export default LikeCommentShare;

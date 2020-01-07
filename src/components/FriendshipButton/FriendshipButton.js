import React from "react";

import classes from "./FriendshipButton.module.css";

const FriendshipButton = props => {
    let friendShipButton = null;
    if (props.text && props.clicked) {
        friendShipButton = (
            <a className={classes.FriendShipButton} onClick={props.clicked}>
                {props.text}
            </a>
        );
    }
    return friendShipButton;
};

export default FriendshipButton;

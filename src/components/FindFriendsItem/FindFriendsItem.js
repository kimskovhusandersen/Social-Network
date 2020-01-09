import React from "react";
import { Link } from "react-router-dom";
import FriendshipButtonBuilder from "../../containers/FriendshipButtonBuilder/FriendshipButtonBuilder";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import classes from "./FindFriendsItem.module.css";

const FindFriendsItem = props => {
    let friendshipButtonBuilder = null;
    if (props.profile) {
        friendshipButtonBuilder = (
            <FriendshipButtonBuilder profile={props.profile} />
        );
    }

    return (
        <div className={classes.FindFriendItem}>
            <Link
                className={classes.ProfilePhoto}
                to={`/user/${props.profile.id}`}
            >
                <ProfilePhoto src={props.profile.url} />
            </Link>
            <div className={classes.NameAndFriendsWrapper}>
                <Link className={classes.Name} to={`/user/${props.profile.id}`}>
                    {props.profile.first_name} {props.profile.last_Name}
                </Link>
                <span className={classes.MutualFriends}>
                    Number of mutual friends
                </span>
            </div>
            <div>{friendshipButtonBuilder}</div>
        </div>
    );
};
export default FindFriendsItem;

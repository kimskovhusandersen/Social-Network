import React from "react";
import { Link } from "react-router-dom";
import FriendshipButtonBuilder from "../../../containers/FriendshipButtonBuilder/FriendshipButtonBuilder";
import ProfilePhoto from "../../ProfilePhoto/ProfilePhoto";
import classes from "./FriendsItem.module.css";

const FriendsItem = props => {
    let friendshipButtonBuilder = null;
    if (props.profile) {
        console.log(props.profile);
        friendshipButtonBuilder = (
            <FriendshipButtonBuilder profile={props.profile} />
        );
    }

    return (
        <div className={classes.FriendsItem}>
            <Link
                className={classes.ProfilePhoto}
                to={`/user/${props.profile.id}`}
            >
                <ProfilePhoto src={props.profile.url} />
            </Link>
            <div className={classes.NameAndFriendsWrapper}>
                <Link className={classes.Name} to={`/user/${props.profile.id}`}>
                    {props.profile.firstName} {props.profile.middleName}{" "}
                    {props.profile.lastName}
                </Link>
                <span className={classes.MutualFriends}>Number of friends</span>
            </div>
            {friendshipButtonBuilder}
        </div>
    );
};
export default FriendsItem;

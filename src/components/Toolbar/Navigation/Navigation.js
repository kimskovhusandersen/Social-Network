import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePhoto from "../../ProfilePhoto/ProfilePhoto";

import {
    ChevronDown,
    Bell,
    User as UserIcon,
    MessageCircle
} from "../../../style/icons";

import classes from "./Navigation.module.css";

const Navigation = props => {
    let profilePhoto = null;
    if (props.photos && props.photos.profile_photos) {
        profilePhoto = (
            <ProfilePhoto
                src={props.photos.profile_photos[0].url}
                alt="profile-photo"
            />
        );
    }
    let firstName = null;
    if (props.profile && props.profile.firstName) {
        firstName = props.profile.firstName;
    }

    return (
        <ul className={classes.Navigation}>
            <li>
                <Link to="/profile">
                    {profilePhoto}
                    <span>{firstName}</span>
                </Link>
            </li>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/friends/requests">
                    <UserIcon title="Friend requests" />
                </Link>
            </li>
            <li>
                <Link to="/messages">
                    <MessageCircle title="Messages" />
                </Link>
            </li>
            <li>
                <Link to="/notifications">
                    <Bell title="Notifications" />
                </Link>
            </li>
            <li>
                <Link to="/settings">
                    <ChevronDown title="Account Settings" />
                </Link>
            </li>
        </ul>
    );
};

export default Navigation;

import React from "react";
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
                <a href="/profile">
                    {profilePhoto}
                    <span>{firstName}</span>
                </a>
            </li>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/friends/requests">
                    <UserIcon title="Friend requests" />
                </a>
            </li>
            <li>
                <a href="/messages">
                    <MessageCircle title="Messages" />
                </a>
            </li>
            <li>
                <a href="/notifications">
                    <Bell title="Notifications" />
                </a>
            </li>
            <li>
                <a href="settings">
                    <ChevronDown title="Account Settings" />
                </a>
            </li>
        </ul>
    );
};

export default Navigation;

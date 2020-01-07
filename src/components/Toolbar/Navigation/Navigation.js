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
    if (props.profilePhotoUrl) {
        profilePhoto = <ProfilePhoto src={props.profilePhotoUrl} />;
    }

    return (
        <ul className={classes.Navigation}>
            <li>
                <a href="/profile">
                    {profilePhoto}
                    <span>{props.profile.first_name}</span>
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

const mapStateToProps = state => {
    return {
        profilePhotoUrl: state.photoReducer.profilePhotoUrl
    };
};

export default connect(mapStateToProps)(Navigation);

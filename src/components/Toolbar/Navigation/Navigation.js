import React from "react";

import {
    ChevronDown,
    Bell,
    User as UserIcon,
    MessageCircle
} from "../../../style/icons";

import classes from "./Navigation.module.css";

const Navigation = ({ profile, photos }) => (
    <ul className={classes.Navigation}>
        <li>
            <a href="/profile">
                <img src={photos.profilePhotoUrl} />
                <span>{profile.firstName}</span>
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

export default Navigation;

import React from "react";
import { Link } from "react-router-dom";
import classes from "./SecondaryNav.module.css";
const SecondaryNav = props => {
    let url = null;
    let numberOfFriends = null;

    if (props.url) {
        url = props.url;
    }
    if (props.numberOfFriends) {
        numberOfFriends = `(${numberOfFriends})`;
    }
    return (
        <ul className={classes.SecondaryNav}>
            <li>&nbsp;</li>
            <li>
                <Link to={url}>Timeline</Link>
            </li>
            <li>
                <Link to={url + "/about"}>About</Link>
            </li>
            <li>
                <Link to={url + "/friends"}>Friends {numberOfFriends}</Link>
            </li>
            <li>
                <Link to={url + "/photos"}>Photos</Link>
            </li>
        </ul>
    );
};

export default SecondaryNav;

import React, { useState, useRef } from "react";
import SearchBar from "./SearchBar/SearchBar.js";

import Navigation from "./Navigation/Navigation.js";
import Logo from "../Logo/Logo.js";
import classes from "./Toolbar.module.css";

const Toolbar = props => {
    return (
        <div className={classes.OuterToolbar}>
            <div className={classes.Toolbar}>
                <div className={classes.LogoWrapper}>
                    <Logo />
                </div>
                <div className={classes.SearchWrapper}>
                    <SearchBar profileId={props.profile.id} />
                </div>
                <div className={classes.NavigationWrapper}>
                    <Navigation photos={props.photos} profile={props.profile} />
                </div>
            </div>
        </div>
    );
};

export default Toolbar;

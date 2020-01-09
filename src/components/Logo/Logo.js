import React from "react";
import { Link } from "react-router-dom";

import classes from "./Logo.module.css";

const Logo = props => (
    <Link to="/">
        <img className={classes.Logo} src={"/logo.jpg"} alt="logo" />
    </Link>
);

export default Logo;

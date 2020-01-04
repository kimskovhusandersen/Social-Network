import React from "react";
import logo from "../../assets/images/logo.svg";
import classes from "./Logo.module.css";

const Logo = props => <img className={classes.Logo} src={logo} alt="logo" />;

export default Logo;

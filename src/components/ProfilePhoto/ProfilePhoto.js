import React from "react";
import classes from "./ProfilePhoto.module.css";

const ProfilePhoto = props => {
    return (
        <img
            src={props.src}
            alt={props.alt}
            onClick={props.clicked}
            className={classes.ProfilePhoto}
        />
    );
};

const mapStateToProps = state => {
    return {
        profilePhoto: state.photoReducer.photos
    };
};

export default ProfilePhoto;

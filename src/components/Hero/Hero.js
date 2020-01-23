import React from "react";
import { connect } from "react-redux";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import SecondaryNav from "./SecondaryNav/SecondaryNav";

import classes from "./Hero.module.css";

const Hero = props => {
    let profilePhoto = null;
    let heroImage = null;
    let numberOfFriends = null;
    let name = null;
    let url = null;
    let secondaryNav = null;

    heroImage = (
        <img
            className={classes.HeroImg}
            src="https://picsum.photos/1500/500"
            alt=""
        />
    );

    if (props.photos && props.photos.profile_photos) {
        profilePhoto = (
            <div className={classes.HeroProfilePhoto}>
                <ProfilePhoto
                    clicked={e => props.toggle(e, "isPhotoUploaderVisible")}
                    src={props.photos.profile_photos[0].url}
                    alt="profile-photo"
                />
            </div>
        );
    }

    if (props.profile) {
        {
            let nameArr = [
                props.profile.firstName,
                props.profile.middleName,
                props.profile.lastName
            ];
            name = nameArr.filter(name => name !== undefined).join(" ");
        }
    }
    if (props.url) {
        secondaryNav = (
            <SecondaryNav url={props.url} numberOfFriends={numberOfFriends} />
        );
    }

    return (
        <div className={classes.TopSectionWrapper}>
            <div className={classes.TopSection}>
                <div className={classes.HeroWrapper}>
                    {heroImage}
                    {profilePhoto}
                    <span className={classes.HeroName}>{name}</span>
                </div>
                <nav className={classes.SecondarySection}>{secondaryNav}</nav>
            </div>
        </div>
    );
};

export default Hero;

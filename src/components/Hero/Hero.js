import React from "react";
import { connect } from "react-redux";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import classes from "./Hero.module.css";

const Hero = props => {
    let profilePhoto = null;
    let heroImage = null;
    let numberOfFriends = "Friends";

    heroImage = (
        <img
            className={classes.HeroImg}
            src="https://picsum.photos/1500/500"
            alt=""
        />
    );

    if (props.profilePhotoUrl) {
        profilePhoto = (
            <div className={classes.HeroProfilePhoto}>
                <ProfilePhoto
                    clicked={e => props.toggle(e, "isPhotoUploaderVisible")}
                    src={props.profilePhotoUrl}
                    alt="profile-photo"
                />
            </div>
        );
    }

    if (props.numberOfFriends) {
        numberOfFriends = `Friends (${props.numberOfFriends})`;
    }

    return (
        <div className={classes.TopSectionWrapper}>
            <div className={classes.TopSection}>
                <div className={classes.HeroWrapper}>
                    {heroImage}
                    {profilePhoto}
                    <span className={classes.HeroName}>{props.fullName}</span>
                </div>
                <nav className={classes.SecondarySection}>
                    <ul className={classes.SecondaryNav}>
                        <li>&nbsp;</li>
                        <li>
                            <a href="/">Timeline</a>
                        </li>
                        <li>
                            <a href="/profile/about">About</a>
                        </li>
                        <li>
                            <a href="/profile/friends">{numberOfFriends}</a>
                        </li>
                        <li>
                            <a href="/profile/photos">Photos</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        profilePhotoUrl: state.photoReducer.profilePhotoUrl
    };
};
export default connect(mapStateToProps)(Hero);

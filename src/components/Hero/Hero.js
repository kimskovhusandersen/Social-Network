import React from "react";

import classes from "./Hero.module.css";

const Hero = props => {
    const heroImage = (
        <img
            className={classes.HeroImg}
            src="https://picsum.photos/1500/500"
            alt=""
        />
    );

    let heroProfilePhoto = (
        <img
            className={classes.HeroProfilePhoto}
            onClick={e => props.toggle(e, "isPhotoUploaderVisible")}
            src={props.profilePhotoUrl}
            alt="profile-photo"
        />
    );

    let numberOfFriends = "Friends";
    if (props.numberOfFriends) {
        numberOfFriends = `Friends (${props.numberOfFriends})`;
    }

    return (
        <div className={classes.TopSectionWrapper}>
            <div className={classes.TopSection}>
                <div className={classes.HeroWrapper}>
                    {heroImage}
                    {heroProfilePhoto}
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

export default Hero;

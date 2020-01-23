import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { useFetchData } from "../../helpers";
import Toolbar from "../../components/Toolbar/Toolbar";
import Hero from "../../components/Hero/Hero.js";

import axios from "../.:/../../axios_csurf.js";

import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import OtherProfileBuilder from "../../containers/OtherProfileBuilder/OtherProfileBuilder";
import PhotoBuilder from "../../containers/PhotoBuilder/PhotoBuilder";
import FriendsBuilder from "../../containers/FriendsBuilder/FriendsBuilder";
import AboutBuilder from "../../containers/AboutBuilder/AboutBuilder";
import BioHandler from "../../containers/BioHandler/BioHandler";
import ProfilePhotoHandler from "../../containers/ProfilePhotoHandler/ProfilePhotoHandler";

import classes from "./OtherProfileLayout.module.css";

class OtherProfileLayout extends Component {
    componentDidMount() {
        const { profileId } = this.props;
        const { id: otherProfileId } = this.props.match.params;

        if (profileId == otherProfileId) {
            return this.props.history.push("/");
        } else {
            this.props.onFetchOtherProfile(otherProfileId);
            this.props.onFetchOtherPhotos(otherProfileId);
        }
    }

    render() {
        let hero = null;
        let bioHandler = null;
        let profileBuilder = null;
        let friendsBuilder = null;
        let photosBuilder = null;
        let aboutBuilder = null;
        let url = "/";

        if (this.props.profile && this.props.match) {
            url = this.props.match.url;

            hero = (
                <Hero
                    profile={this.props.profile}
                    numberOfFriends={"99"}
                    photos={this.props.photos}
                    url={url}
                />
            );
            bioHandler = (
                <BioHandler
                    createdAt={this.props.profile.createdAt}
                    bio={this.props.profile.aboutMe}
                    isBioVisible={true}
                />
            );
            profileBuilder = (
                <OtherProfileBuilder
                    bioHandler={bioHandler}
                    profile={this.props.profile}
                    photos={this.props.photos}
                />
            );

            photosBuilder = <PhotoBuilder profile={this.props.profile} />;
            aboutBuilder = <AboutBuilder profile={this.props.profile} />;
            friendsBuilder = <FriendsBuilder profile={this.props.profile} />;
        }

        return (
            <main>
                {hero}
                <div className={classes.ProfilePageWrapper}>
                    <div className={classes.ProfileInnerPage}>
                        <Route
                            exact
                            path="/user/:id"
                            render={props => profileBuilder}
                        />
                        <Route
                            path="/user/:id/friends"
                            render={() => friendsBuilder}
                        />
                        <Route
                            path="/user/:id/photos"
                            render={() => photosBuilder}
                        />
                        <Route
                            path="/user/:id/about"
                            render={() => aboutBuilder}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.otherProfile.profile,
        photos: state.otherPhoto.photos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOtherProfile: otherProfileId =>
            dispatch(actions.fetchOtherProfile(otherProfileId)),
        onFetchOtherPhotos: otherProfileId =>
            dispatch(actions.fetchOtherPhotos(otherProfileId))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(OtherProfileLayout));

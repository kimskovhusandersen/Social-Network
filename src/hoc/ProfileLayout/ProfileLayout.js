import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { useFetchData } from "../../helpers";
import Toolbar from "../../components/Toolbar/Toolbar";
import Hero from "../../components/Hero/Hero.js";

import Photos from "../../components/photos";
import ProfileBuilder from "../../containers/ProfileBuilder/ProfileBuilder";
import FriendsBuilder from "../../containers/FriendsBuilder/FriendsBuilder";
import BioHandler from "../../containers/BioHandler/BioHandler";
import ProfilePhotoHandler from "../../containers/profile-photo-handler";
import { GlobalStyle } from "../../style/theme";
import classes from "./ProfileLayout.module.css";

class ProfileLayout extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log("[ProfileLayout.js], componentDidMount");
        if (this.props.profileId !== this.props.match.params.id) {
            const data = await useFetchData(
                `/api/profiles/${this.props.match.params.id}`
            );
            console.log("logging state", this.props);
        }
    }
    componentDidUpdate() {
        console.log("[componentDidUpdate.js], componentDidMount");
    }

    render() {
        let hero = null;
        let bioHandler = null;
        let profilePhotoHandler = null;
        let profileBuilder = null;
        let friendsBuilder = null;
        let photosBuilder = null;

        if (this.props.profile && this.props.photos) {
            hero = (
                <Hero
                    fullName={this.props.profile.firstName}
                    numberOfFriends={"99"}
                    profilePhotoUrl={this.props.photos.profilePhotoUrl}
                    toggle={this.props.toggle}
                />
            );
            console.log(hero);
            bioHandler = (
                <BioHandler
                    createdAt={this.props.profile.createdAt}
                    aboutMe={this.props.profile.aboutMe}
                    isAboutMeVisible={this.props.isAboutMeVisible}
                    isAboutMeFormVisible={this.props.isAboutMeFormVisible}
                    toggle={this.props.toggle}
                    upsertState={this.props.upsertState}
                />
            );
            profilePhotoHandler = (
                <ProfilePhotoHandler
                    toggle={this.props.toggle}
                    upsertState={this.upsertState}
                />
            );
            profileBuilder = (
                <ProfileBuilder
                    bioHandler={bioHandler}
                    photoUploader={profilePhotoHandler}
                    profile={this.props.profile}
                    photos={this.props.photos}
                />
            );
        }

        if (this.props.profile) {
            friendsBuilder = (
                <FriendsBuilder profileId={this.props.profile.id} />
            );
        }
        if (this.props.photos) {
            photosBuilder = <Photos />;
        }

        return (
            <Fragment>
                <GlobalStyle />
                <main>
                    <Hero
                        fullName={this.props.profile.firstName}
                        numberOfFriends={"99"}
                        profilePhotoUrl={this.props.photos.profilePhotoUrl}
                        toggle={this.props.toggle}
                    />
                    <div className={classes.ProfilePageWrapper}>
                        <div className={classes.ProfileInnerPage}>
                            <Route
                                exact
                                path="/profile"
                                render={() => profileBuilder}
                            />
                            <Route
                                path="/user/:id"
                                render={props => profileBuilder}
                            />
                            <Route
                                path="/friends"
                                render={() => friendsBuilder}
                            />
                            <Route
                                path="/photos"
                                render={() => photosBuilder}
                            />
                        </div>
                    </div>
                </main>
            </Fragment>
        );
    }
}
export default withRouter(ProfileLayout);

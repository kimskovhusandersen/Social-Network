import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { useFetchData } from "../../helpers";
import Toolbar from "../../components/Toolbar/Toolbar";
import Hero from "../../components/Hero/Hero.js";

import axios from "../.:/../../axios_csurf.js";

import Photos from "../../components/photos";
import ProfileBuilder from "../../containers/ProfileBuilder/ProfileBuilder";
import FriendsBuilder from "../../containers/FriendsBuilder/FriendsBuilder";
import BioHandler from "../../containers/BioHandler/BioHandler";
import ProfilePhotoHandler from "../../containers/ProfilePhotoHandler/ProfilePhotoHandler";
import { GlobalStyle } from "../../style/theme";
import classes from "./ProfileLayout.module.css";

class ProfileLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            photos: null,
            isOtherProfile: false,
            isPhotoUploaderVisible: true,
            isBioVisible: true,
            isBioEditVisible: true,
            isBioFormVisible: false
        };
    }

    async componentDidMount() {
        console.log("[ProfileLayout.js], componentDidMount");
        if (this.props.match.url.split("/").includes("profile")) {
            const [profile, photo] = [
                await useFetchData("/api/my-profile"),
                await useFetchData(`/api/my-profile-photo`)
            ];

            if (photo && profile) {
                this.setState({
                    ...this.state,
                    profile,
                    photos: {
                        ...this.state.photos,
                        profilePhotoUrl: photo.url
                    },
                    isOtherProfile: false,
                    isPhotoUploaderVisible: true,
                    isBioVisible: true,
                    isBioEditVisible: true,
                    isBioFormVisible: false
                });
            }
        } else if (
            !this.state.profile ||
            (this.props.match.params.id &&
                this.state.profile.id !== this.props.match.params.id)
        ) {
            const [profile, photo] = [
                await useFetchData(
                    `/api/profiles/${this.props.match.params.id}`
                ),
                await useFetchData(
                    `/api/profile-photo/${this.props.match.params.id}`
                )
            ];

            if (photo && profile) {
                await this.setState({
                    ...this.state,
                    profile,
                    photos: {
                        profilePhotoUrl: photo.url
                    },
                    isOtherProfile: true,
                    isPhotoUploaderVisible: false,
                    isBioVisible: true,
                    isBioEditVisible: false,
                    isBioFormVisible: false
                });
            }
        }
    }

    toggle(e, prop) {
        if (Array.isArray(prop)) {
            prop.forEach(p => {
                this.setState(prevState => ({
                    [p]: !prevState[p]
                }));
            });
        } else {
            this.setState(prevState => ({
                [prop]: !prevState[prop]
            }));
        }
    }
    upsertState(prop, newProps) {
        for (let [key, value] of Object.entries(newProps)) {
            if (value != null) {
                this.setState(prevState => ({
                    [prop]: {
                        ...prevState[prop],
                        [key]: value
                    }
                }));
            }
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

        if (this.state.profile && this.state.photos) {
            let toggle = (e, prop) => this.toggle(e, prop);
            if (this.state.isOtherProfile) {
                toggle = () => null;
            }
            hero = (
                <Hero
                    fullName={this.state.profile.firstName}
                    numberOfFriends={"99"}
                    profilePhotoUrl={this.state.photos.profilePhotoUrl}
                    toggle={toggle}
                />
            );
            bioHandler = (
                <BioHandler
                    createdAt={this.state.profile.createdAt}
                    bio={this.state.profile.aboutMe}
                    isBioVisible={this.state.isBioVisible}
                    isBioEditVisible={this.state.isBioEditVisible}
                    isBioFormVisible={this.state.isBioFormVisible}
                    upsertState={(prop, newProps) =>
                        this.upsertState(prop, newProps)
                    }
                    toggle={toggle}
                />
            );
            profilePhotoHandler = (
                <ProfilePhotoHandler
                    isPhotoUploaderVisible={this.state.isPhotoUploaderVisible}
                    upsertState={(prop, newProps) =>
                        this.upsertState(prop, newProps)
                    }
                    toggle={(e, prop) => this.toggle(e, prop)}
                />
            );
            profileBuilder = (
                <ProfileBuilder
                    bioHandler={bioHandler}
                    isBioFormVisible={this.state.isBioFormVisible}
                    photoUploader={profilePhotoHandler}
                    isPhotoUploaderVisible={this.state.isPhotoUploaderVisible}
                    profile={this.state.profile}
                    photos={this.state.photos}
                />
            );
            photosBuilder = <Photos profile={this.state.profile} />;
            friendsBuilder = <FriendsBuilder profile={this.state.profile} />;
        }

        return (
            <Fragment>
                <GlobalStyle />
                <main>
                    {hero}
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
                                path="/profile/friends"
                                render={() => friendsBuilder}
                            />
                            <Route
                                path="/profile/photos"
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

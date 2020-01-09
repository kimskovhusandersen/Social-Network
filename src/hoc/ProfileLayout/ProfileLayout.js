import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { useFetchData } from "../../helpers";
import Toolbar from "../../components/Toolbar/Toolbar";
import Hero from "../../components/Hero/Hero.js";

import axios from "../.:/../../axios_csurf.js";

import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import ProfileBuilder from "../../containers/ProfileBuilder/ProfileBuilder";
import PhotoBuilder from "../../containers/PhotoBuilder/PhotoBuilder";
import FriendsBuilder from "../../containers/FriendsBuilder/FriendsBuilder";
import AboutBuilder from "../../containers/AboutBuilder/AboutBuilder";
import BioHandler from "../../containers/BioHandler/BioHandler";
import ProfilePhotoHandler from "../../containers/ProfilePhotoHandler/ProfilePhotoHandler";

import classes from "./ProfileLayout.module.css";

class ProfileLayout extends Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            profile: null,
            isOtherProfile: false,
            isPhotoUploaderVisible: false,
            isBioVisible: true,
            isBioEditVisible: true,
            isBioFormVisible: false
        };
        this.state = this.defaultState;
    }

    async componentDidMount() {
        console.log("[ProfileLayout.js], componentDidMount");
        if (this.props.match.url.split("/").includes("profile")) {
            const [profile] = [await useFetchData("/api/my-profile")];

            if (profile) {
                this.setState({
                    ...this.state,
                    profile,
                    isOtherProfile: false,
                    isPhotoUploaderVisible: false,
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
            const [profile] = [
                await useFetchData(
                    `/api/profiles/${this.props.match.params.id}`
                )
            ];

            if (profile) {
                await this.setState({
                    ...this.state,
                    profile,
                    isOtherProfile: true,
                    isPhotoUploaderVisible: false,
                    isBioVisible: true,
                    isBioEditVisible: true,
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
        let aboutBuilder = null;

        if (this.state.profile) {
            let toggle = (e, prop) => this.toggle(e, prop);
            if (this.state.isOtherProfile) {
                toggle = () => null;
            }
            hero = (
                <Hero
                    fullName={this.state.profile.firstName}
                    numberOfFriends={"99"}
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
                />
            );

            aboutBuilder = <AboutBuilder profile={this.state.profile} />;
            photosBuilder = <PhotoBuilder profile={this.state.profile} />;
            friendsBuilder = <FriendsBuilder profile={this.state.profile} />;
        }

        return (
            <Fragment>
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
                            <Route
                                path="/profile/about"
                                render={() => aboutBuilder}
                            />
                        </div>
                    </div>
                </main>
            </Fragment>
        );
    }
}
export default withRouter(ProfileLayout);

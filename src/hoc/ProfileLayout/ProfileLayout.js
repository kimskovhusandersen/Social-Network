import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Toolbar from "../../components/Toolbar/Toolbar";
import Hero from "../../components/Hero/Hero";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import ProfileBuilder from "../../containers/ProfileBuilder/ProfileBuilder";
import PhotoBuilder from "../../containers/PhotoBuilder/PhotoBuilder";
import FriendsBuilder from "../../containers/FriendsBuilder/FriendsBuilder";
import AboutBuilder from "../../containers/AboutBuilder/AboutBuilder";
import BioHandler from "../../containers/BioHandler/BioHandler";
import ProfilePhotoHandler from "../../containers/ProfilePhotoHandler/ProfilePhotoHandler";

import classes from "./ProfileLayout.module.css";

const defaultState = {
    isPhotoUploaderVisible: false,
    isBioVisible: true,
    isBioEditVisible: true,
    isBioFormVisible: false
};

class ProfileLayout extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
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
        const url = this.props.match.url;
    }

    render() {
        let hero = null;
        let bioHandler = null;
        let profilePhotoHandler = null;
        let profileBuilder = null;
        let friendsBuilder = null;
        let photosBuilder = null;
        let aboutBuilder = null;
        let url = "/";

        if (this.props.match) {
            url = this.props.match.url;
        }

        if (this.props.profile) {
            let toggle = (e, prop) => this.toggle(e, prop);
            if (this.state.isOtherProfile) {
                toggle = () => null;
            }
            hero = (
                <Hero
                    profile={this.props.profile}
                    photos={this.props.photos}
                    numberOfFriends={"99"}
                    toggle={toggle}
                    url={url}
                />
            );
            bioHandler = (
                <BioHandler
                    createdAt={this.props.profile.createdAt}
                    bio={this.props.profile.aboutMe}
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
                    profile={this.props.profile}
                    photos={this.props.photos}
                />
            );

            aboutBuilder = <AboutBuilder profile={this.props.profile} />;
            photosBuilder = <PhotoBuilder profile={this.props.profile} />;
            friendsBuilder = <FriendsBuilder profile={this.props.profile} />;
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

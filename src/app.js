import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions";

import { useFetchData } from "./helpers";

// hoc
import TimeLineLayout from "./hoc/TimeLineLayout/TimeLineLayout";
import ProfileLayout from "./hoc/ProfileLayout/ProfileLayout";
import ChatLayout from "./hoc/ChatLayout/ChatLayout";
import FindFriendsLayout from "./hoc/FindFriendsLayout/FindFriendsLayout";
import PhotoLayout from "./hoc/PhotoLayout/PhotoLayout";
import AuthLayout from "./hoc/AuthLayout/AuthLayout";

// components
import Toolbar from "./components/Toolbar/Toolbar";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: null,
            photos: null
        };
    }

    async componentDidMount() {
        this.props.onFetchProfile();
        const [profile, photo] = [
            await useFetchData("/api/my-profile"),
            await useFetchData(`/api/my-profile-photo`)
        ];

        if (photo && profile) {
            this.setState({
                ...this.state,
                photos: {
                    ...this.state.photos,
                    profilePhotoUrl: photo.url
                },
                profile
            });
        }
    }

    render() {
        let toolbar = null;

        if (this.state.profile && this.state.photos) {
            toolbar = (
                <Toolbar
                    profile={this.state.profile}
                    photos={this.state.photos}
                />
            );
        }

        return (
            <Fragment>
                {toolbar}
                <Switch>
                    <Route exact path="/" component={TimeLineLayout} />
                    <Route exact path="/profile" component={ProfileLayout} />
                    <Route path="/user/:id" component={ProfileLayout} />
                    <Route path="/profile/friends" component={ProfileLayout} />
                    <Route path="/profile/photos" component={ProfileLayout} />
                    <Route path="/photo/:id" component={PhotoLayout} />
                    <Route path="/find-friends" component={FindFriendsLayout} />
                    <Route path="/messages" component={ChatLayout} />
                    <Route path="/logout" component={AuthLayout} />
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer.profile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: () => dispatch(actions.fetchProfile())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

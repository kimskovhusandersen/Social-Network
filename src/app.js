import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions";

import { useFetchData } from "./helpers";

// hoc
import TimeLineLayout from "./hoc/TimeLineLayout/TimeLineLayout";
import ProfileLayout from "./hoc/ProfileLayout/ProfileLayout";
import OtherProfileLayout from "./hoc/OtherProfileLayout/OtherProfileLayout";
import ChatLayout from "./hoc/ChatLayout/ChatLayout";
import FindFriendsLayout from "./hoc/FindFriendsLayout/FindFriendsLayout";
import PhotoLayout from "./hoc/PhotoLayout/PhotoLayout";
import AuthLayout from "./hoc/AuthLayout/AuthLayout";
import { GlobalStyle } from "./style/theme";

// components
import Toolbar from "./components/Toolbar/Toolbar";

export class App extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        this.props.onFetchProfile();
        this.props.onFetchPhotos();
        this.props.onFetchFriends();
        this.props.onFetchFriendRequests();
    }

    render() {
        let toolbar = null;
        if (this.props.profile && this.props.photos) {
            toolbar = (
                <Toolbar
                    profile={this.props.profile}
                    photos={this.props.photos}
                />
            );
        }

        return (
            <Fragment>
                <GlobalStyle />
                {toolbar}
                <Switch>
                    <Route exact path="/" component={TimeLineLayout} />

                    <Route
                        path="/profile"
                        render={() => (
                            <ProfileLayout
                                profile={this.props.profile}
                                photos={this.props.photos}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={() => (
                            <OtherProfileLayout
                                profile={this.props.profile}
                                photos={this.props.photos}
                            />
                        )}
                    />

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
        profile: state.profileReducer.profile,
        photos: state.photoReducer.photos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: () => dispatch(actions.fetchProfile()),
        onFetchPhotos: () => dispatch(actions.fetchPhotos()),
        onFetchFriends: () => dispatch(actions.fetchFriends()),
        onFetchFriendRequests: () => dispatch(actions.fetchFriendRequests())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

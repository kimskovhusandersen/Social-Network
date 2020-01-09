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

        if (this.props.profile) {
            toolbar = <Toolbar profile={this.props.profile} />;
        }

        return (
            <Fragment>
                <GlobalStyle />
                {toolbar}
                <Switch>
                    <Route exact path="/" component={TimeLineLayout} />
                    <Route exact path="/profile" component={ProfileLayout} />
                    <Route path="/user/:id" component={ProfileLayout} />
                    <Route path="/profile/friends" component={ProfileLayout} />
                    <Route path="/profile/photos" component={ProfileLayout} />
                    <Route path="/profile/about" component={ProfileLayout} />
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

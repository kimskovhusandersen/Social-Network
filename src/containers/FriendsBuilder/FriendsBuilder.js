import React, { Component, Fragment } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import * as actions from "../../store/actions";

import FriendsItem from "../../components/Friends/FriendsItem/FriendsItem.js";

import FriendsNavigation from "../../components/Friends/FriendsNavigation/FriendsNavigation.js";
// Style
import { FriendsItemWrapper, FriendsWrapper } from "../../style/friends";

import classes from "./FriendsBuilder.module.css";

class FriendsBuilder extends Component {
    render() {
        let friends = null;
        let friendRequests = null;
        let friendsBySearch = null;

        if (this.props.friends) {
            friends = this.props.friends.map(profile => {
                return <FriendsItem key={profile.id} profile={profile} />;
            });
        }

        if (this.props.friendRequests) {
            friendRequests = this.props.friendRequests.map(profile => {
                return <FriendsItem key={profile.id} profile={profile} />;
            });
        }

        if (friendsBySearch && friendsBySearch.length > 0) {
            friendsBySearch = friendsBySearch.map(profile => {
                return <FriendsItem key={profile.id} profile={profile} />;
            });
        }

        return (
            <div className={classes.FriendsBuilder}>
                <FriendsNavigation
                    profileId={this.props.profileId}
                    handleSearch={values => this.handleSearch(values)}
                />
                <div className={classes.FriendsWrapper}>{friendRequests}</div>
                <div className={classes.FriendsWrapper}>
                    {friendsBySearch || friends}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        friends: state.friendReducer.friends,
        friendRequests: state.friendReducer.friendRequests
    };
};

export default connect(mapStateToProps)(FriendsBuilder);

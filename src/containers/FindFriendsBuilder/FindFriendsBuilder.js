import React, { Component, Fragment } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
// Controllers
import { getFriends } from "../../actions";
import { useFetchData } from "../../helpers";
// Views
import FindFriendsItem from "../../components/FindFriendsItem/FindFriendsItem";

import { SearchInput } from "../../style/theme";

import classes from "./FindFriendsBuilder.module.css";

class FindFriendsBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.onFetchMostRecentProfiles();
    }

    handleChange(e) {
        this.setUserInput(e.target.value);
    }
    render() {
        let mostRecentProfiles = null;
        if (this.props.mostRecentProfiles) {
            mostRecentProfiles = this.props.mostRecentProfiles.map(profile => {
                return <FindFriendsItem key={profile.id} profile={profile} />;
            });
        }
        let statusMessage = "No New Friend Requests";
        let friendRequests = null;
        let profiles = null;

        if (friendRequests && friendRequests.length > 0) {
            statusMessage = "New friend requests";
            friendRequests = friendRequests.map(fr => (
                <FindFriendsItem key={fr.id} profile={fr} />
            ));
        }

        return (
            <div className={classes.FindFriendsBuilder}>
                <div className={classes.FindFriendsSecionWrapper}>
                    <div className={classes.FindFriendsHeader}>
                        <h1>{statusMessage}</h1>
                        <Link to="/">view sent requests</Link>
                    </div>
                    {friendRequests}
                </div>

                <div className={classes.FindFriendsSecionWrapper}>
                    <div className={classes.FindFriendsHeader}>
                        <h1>People you may know</h1>
                    </div>
                    {mostRecentProfiles}
                </div>

                <div className={classes.FindFriendsSecionWrapper}>
                    <SearchInput
                        type="text"
                        onChange={e => this.handleChange(e)}
                        placeholder="Search"
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        mostRecentProfiles: state.profileReducer.mostRecentProfiles
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchMostRecentProfiles: () =>
            dispatch(actions.fetchMostRecentProfiles())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindFriendsBuilder);

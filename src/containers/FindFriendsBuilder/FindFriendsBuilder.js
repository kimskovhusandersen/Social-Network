import React, { Component, Fragment } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useFetchData } from "../../helpers";
import FindFriendsItem from "../../components/FindFriends/FindFriendsItem/FindFriendsItem";
import Search from "../../components/FindFriends/SearchBar/SearchBar";

import classes from "./FindFriendsBuilder.module.css";

class FindFriendsBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        };
    }
    componentDidMount() {
        this.props.onFetchMostRecentProfiles();
    }

    handleSearchResult(searchResult) {
        if (searchResult) {
            this.setState({ ...this.state, searchResult });
        }
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

        let searchResult = null;
        if (this.state.searchResult.length > 0) {
            searchResult = (
                <div className={classes.SearchResultWrapper}>
                    {this.state.searchResult.map(profile => (
                        <FindFriendsItem key={profile.id} profile={profile} />
                    ))}
                </div>
            );
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

                    <Search
                        handleSearchResult={searchResult =>
                            this.handleSearchResult(searchResult)
                        }
                    />

                    {searchResult || mostRecentProfiles}
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

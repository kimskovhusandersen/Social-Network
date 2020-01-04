import React, { Component, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
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
        this.state = {
            profiles: null,
            userInput: null
        };
    }
    componentDidMount() {
        // const dispatch = useDispatch();
        // dispatch(getFriends());
        // const friendRequests = useSelector(
        //     state =>
        //         state.friends &&
        //         state.friends.filter(profile => profile.accepted == false)
        // );
    }
    async componentDidMount() {
        let userInput;
        if (userInput == "") {
            const data = await useFetchData("/api/recent-profiles");
            data && this.setProfiles(data);
        } else {
            let data = await useFetchData(`/api/profiles/search/${userInput}`);
            data = !Array.isArray(data) && data ? [data] : data;
            !!data && this.setProfiles(data);
        }
    }

    setProfiles(data) {
        console.log(data);
    }
    setUserInput(val) {
        console.log(val);
    }
    handleChange(e) {
        this.setUserInput(e.target.value);
    }
    render() {
        let statusMessage = "No New Friend Requests";
        let friendRequests = null;
        let profiles = null;

        if (friendRequests && friendRequests.length > 0) {
            statusMessage = "New friend requests";
            friendRequests = friendRequests.map(fr => (
                <FindFriendsItem key={fr.id} profile={fr} />
            ));
        }

        if (this.state.profiles) {
            <Fragment>
                <span>People you may know</span>
                profiles = profiles.map(profile => (
                <FindFriendsItem key={profile.id} profile={profile} />
                ));
            </Fragment>;
        }
        return (
            <Fragment>
                <div className={classes.FindFriendsItemWrapper}>
                    <span>{statusMessage}</span>
                    {friendRequests}
                </div>
                <div className={classes.FindFriendsItemWrapper}>
                    <SearchInput
                        type="text"
                        onChange={e => this.handleChange(e)}
                        placeholder="Search"
                    />
                </div>
                <div className={classes.FindFriendsItemWrapper}>{profiles}</div>
            </Fragment>
        );
    }
}

export default FindFriendsBuilder;

import React, { Component, Fragment } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { socket } from "../../socket";
import { getFriends } from "../../actions";

import * as actions from "../../store/actions";

import FriendsItem from "../../components/Friends/FriendsItem/FriendsItem.js";

import FriendsNavigation from "../../components/Friends/FriendsNavigation/FriendsNavigation.js";
// Style
import { FriendsItemWrapper, FriendsWrapper } from "../../style/friends";

import classes from "./FriendsBuilde.module.css";

class FriendsBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // const friendsWrapper = useRef();
        // if (friends) {
        //     let { clientHeight, scrollHeight } = friendsWrapper.current;
        //     friendsWrapper.current.scrollTop = scrollHeight - clientHeight;
        // }
        // const dispatch = useDispatch();
        // dispatch(getFriends());
        // const [friendsBySearch, setFriendsBySearch] = useState([]);
        // const friendRequests = useSelector(
        //     state =>
        //         state &&
        //         state.friends &&
        //         state.friends.filter(friend => friend.accepted == false && friend)
        // );
        // const friends = useSelector(
        //     state =>
        //         state &&
        //         state.friends &&
        //         state.friends.filter(friend => friend.accepted == true && friend)
        // );
    }
    handleSearch(result) {
        this.setFriendsBySearch(result);
    }

    setFriendsBySearch(result) {
        console.log(result);
    }

    render() {
        let friends = null;
        let friendsBySearch = null;

        if (this.props.friends) {
            console.log(this.props.friends);
            friends = this.props.friends.map(profile => {
                console.log(profile);
                return <FriendsItem key={profile.id} profile={profile} />;
            });
        }

        if (friendsBySearch && friendsBySearch.length > 0) {
            friendsBySearch = friendsBySearch.map(profile => {
                console.log("hihih", profile);
                return <FriendsItem key={profile.id} profile={profile} />;
            });
        }

        return (
            <div className={classes.FriendsBuilder}>
                <FriendsNavigation
                    profileId={this.props.profileId}
                    handleSearch={values => this.handleSearch(values)}
                />
                <div className={classes.FriendsWrapper}>
                    {friendsBySearch || friends}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        friends: state.friendReducer.friends
    };
};
const mapDispatchToProps = display => {
    return {
        onFetchMostRecentProfiles: () =>
            dispatch(actions.fetchMostRecentProfiles())
    };
};
export default connect(mapStateToProps)(FriendsBuilder);

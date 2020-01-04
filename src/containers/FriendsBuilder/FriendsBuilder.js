import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { getFriends } from "../../actions";

import FriendsPage from "../../components/friends-page";
import FriendsItem from "../../components/friends-item";
import SearchBar from "../../components/Search/Search.js";
// Style
import { FriendsItemWrapper } from "../../style/friends";

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
        let friendRequests = null;

        if (friends) {
            friends = friends.map(friend => (
                <FriendsItem key={friend.id} friend={friend} />
            ));
        }
        if (friendsBySearch && friendsBySearch.length > 0) {
            friendsBySearch = friendsBySearch.map(friend => (
                <FriendsItem key={friend.id} friend={friend} />
            ));
        }

        if (friendRequests) {
            friendRequests = friendRequests.map(friend => (
                <FriendsItem key={friend.id} friend={friend} />
            ));
        }
        return (
            <FriendsPage
                searchForFriends={
                    <SearchBar
                        profileId={this.props.profileId}
                        callback={values => this.handleSearch(values)}
                        searchCategory={"friends"}
                    />
                }
                friends={
                    <div className={classes.FriendsItemWrapper}>
                        {friendsBySearch || friends}
                    </div>
                }
                friendRequests={
                    <div className={classes.FriendsItemWrapper}>
                        {friendRequests}
                    </div>
                }
            />
        );
    }
}

export default FriendsBuilder;

import React, { Component, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { getFriends } from "../../actions";

import FriendsItem from "../../components/friends-item";
import SearchBar from "../../components/Search/Search.js";
// Style
import {
    FriendsItemWrapper,
    FriendsWrapper,
    FriendsHeader
} from "../../style/friends";
import { Search, Users } from "../../style/icons";
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
        let friends = [{ id: 1 }, { id: 2 }];
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
            <FriendsWrapper>
                <FriendsHeader>
                    <div>
                        <span>
                            <Users /> Friends
                        </span>
                        <span>
                            <a href="/find-friends">Find Friends</a>
                        </span>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a>All Friends</a>
                            </li>
                            <li>
                                <a>Birthdays</a>
                            </li>
                            <li>
                                <a>Work</a>
                            </li>
                            <li>
                                <a>University</a>
                            </li>
                            <li>
                                <a>Current City</a>
                            </li>
                            <li>
                                <a>Home Town</a>
                            </li>
                            <li>
                                <a>More</a>
                            </li>
                        </ul>
                        <div>
                            <SearchBar
                                profileId={this.props.profileId}
                                callback={values => this.handleSearch(values)}
                                searchCategory={"friends"}
                            />
                            <Search />
                        </div>
                    </div>
                </FriendsHeader>
                <div className={classes.FriendsItemWrapper}>
                    {friendRequests}
                </div>
                <div className={classes.FriendsItemWrapper}>
                    {friendsBySearch || friends}
                </div>
            </FriendsWrapper>
        );
    }
}

export default FriendsBuilder;

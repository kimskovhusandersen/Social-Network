import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Controllers
import { getFriends } from "./actions";
import { useFetchData } from "./helpers";
// Views
import FindFriendsItem from "./views/find-friends-item";
// Style
import { FindFriendsItemWrapper } from "./style/find-friends-item";
import {
    SearchWrapper,
    SearchInput,
    SearchResult,
    SearchResultItem
} from "./style/theme";
import { Search as SearchIcon } from "./style/icons";

const FindFriends = () => {
    const dispatch = useDispatch();
    const friendRequests = useSelector(
        state =>
            state.friends &&
            state.friends.filter(profile => profile.accepted == false)
    );
    const friends = useSelector(
        state =>
            state.friends &&
            state.friends.filter(profile => profile.accepted == true)
    );

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    const [profiles, setProfiles] = useState([]);
    const [userInput, setUserInput] = useState("");
    const handleChange = event => setUserInput(event.target.value);

    useEffect(() => {
        let ignore;
        (async () => {
            if (userInput == "") {
                const data = await useFetchData("/api/recent-profiles");
                data && setProfiles(data);
            } else {
                ignore = false;
                let data = await useFetchData(
                    `/api/profiles/search/${userInput}`
                );
                data = !Array.isArray(data) && data ? [data] : data;
                !ignore && !!data && setProfiles(data);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [userInput]);

    if (!friends) {
        return null;
    }

    return (
        <React.Fragment>
            <FindFriendsItemWrapper first>
                {friendRequests ? (
                    <span>No New Friend Requests</span>
                ) : (
                    <span>Friend requests</span>
                )}
                {friendRequests &&
                    friendRequests.map(fr => (
                        <FindFriendsItem key={fr.id} profile={fr} />
                    ))}
            </FindFriendsItemWrapper>
            <FindFriendsItemWrapper>
                <SearchInput type="text" onChange={handleChange} />
            </FindFriendsItemWrapper>
            <FindFriendsItemWrapper>
                <span>People you may know</span>
                {profiles.map(profile => (
                    <FindFriendsItem key={profile.id} profile={profile} />
                ))}
            </FindFriendsItemWrapper>

            <FindFriendsItemWrapper>
                {!!friends.length && <span>Friends</span>}
                {friends &&
                    friends.map(friend => (
                        <FindFriendsItem key={friend.id} profile={friend} />
                    ))}
            </FindFriendsItemWrapper>
        </React.Fragment>
    );
};

export default FindFriends;

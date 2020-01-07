import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../Search/Search.js";
import { FriendsHeader } from "./StyledFriendsNavigation.js";
import { Search, Users } from "../../../style/icons.js";

const FriendsNavigation = props => {
    let searchBar = null;
    if (props.profileId && props.handleSearch) {
        searchBar = (
            <SearchBar
                profileId={props.profileId}
                callback={props.handleSearch}
                searchCategory={"friends"}
            />
        );
    }
    return (
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
                    {searchBar}
                    <Search />
                </div>
            </div>
        </FriendsHeader>
    );
};

export default FriendsNavigation;

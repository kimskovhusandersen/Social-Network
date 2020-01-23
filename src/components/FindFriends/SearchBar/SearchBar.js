import React, { useState } from "react";
import Search from "../../Search/Search";
import { Search as SearchIcon } from "../../../style/icons";
import FindFriendsItem from "../FindFriendsItem/FindFriendsItem";

import classes from "./SearchBar.module.css";

const SearchBar = props => {
    return (
        <div className={classes.SearchBarWrapper}>
            <div className={classes.SearchBar}>
                <Search callback={props.handleSearchResult} />

                <SearchIcon />
            </div>
        </div>
    );
};

export default SearchBar;

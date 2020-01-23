import React, { useState } from "react";
import Search from "../../Search/Search";
import { Search as SearchIcon } from "../../../style/icons";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
    const [searchResult, setSearchResult] = useState([]);

    const handleSearchResult = searchResult => {
        setSearchResult(searchResult);
    };

    let searchResultWrapper = null;
    if (searchResult && searchResult.length > 0) {
        searchResultWrapper = (
            <div className={classes.SearchResultWrapper}>
                {searchResult.map(profile => (
                    <a key={profile.id} href={`/user/${profile.id}`}>
                        {profile.firstName} {profile.lastName}
                    </a>
                ))}
            </div>
        );
    }

    return (
        <div className={classes.SearchBarWrapper}>
            <div className={classes.SearchBar}>
                <Search callback={handleSearchResult} />
                <SearchIcon />
            </div>
            {searchResultWrapper}
        </div>
    );
};

export default SearchBar;

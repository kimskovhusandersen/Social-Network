import React from "react";
import SearchBar from "./search-bar";
import { Search } from "../style/icons";

const SearchTop = ({ profileId, handleSearch }) => {
    if (!profileId) {
        return null;
    }
    return (
        <React.Fragment>
            <SearchBar profileId={profileId} callback={handleSearch} />
            <Search />
        </React.Fragment>
    );
};
export default SearchTop;

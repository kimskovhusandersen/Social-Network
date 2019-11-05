import React from "react";
import {
    SearchWrapper,
    SearchInput,
    SearchResult,
    SearchResultItem
} from "../style/theme";
import { Search as SearchIcon } from "../style/icons";

const SearchBar = ({ profiles, handleChange }) => {
    if (!profiles) {
        return null;
    }
    return (
        <SearchWrapper>
            <SearchInput type="text" onChange={handleChange} />
            <SearchIcon color={"red"} />
            <SearchResult>
                {profiles.map(profile => (
                    <SearchResultItem
                        href={`/user/${profile.id}`}
                        key={profile.id}
                    >
                        {profile.firstName} {profile.lastName}
                    </SearchResultItem>
                ))}
            </SearchResult>
        </SearchWrapper>
    );
};

export default SearchBar;

import React, { useEffect } from "react";
import { useStatefulSearch } from "../../hooks";

const SearchForFriends = ({ profileId, callback, searchCategory }) => {
    const [{ data }, handleSearchForFriends] = useStatefulSearch(
        profileId,
        searchCategory
    );
    useEffect(() => {
        callback(data);
    }, [data]);
    return (
        <input
            onChange={handleSearchForFriends}
            name="search"
            placeholder="Search..."
            autoComplete="off"
        />
    );
};

export default SearchForFriends;

import React, { useEffect } from "react";
import { useStatefulSearch } from "../hooks";
import {} from "../style/theme";
import {} from "../style/icons";

const SearchForFriends = ({ profileId, callback, searchCategory }) => {
    console.log("PROFILE ID", profileId);

    const [{ data }, handleSearchForFriends] = useStatefulSearch(
        profileId,
        searchCategory
    );
    useEffect(() => {
        callback(data);
    }, [data]);
    return (
        <React.Fragment>
            <input
                onChange={handleSearchForFriends}
                name="search"
                placeholder="Search for friends..."
            />
        </React.Fragment>
    );
};

export default SearchForFriends;

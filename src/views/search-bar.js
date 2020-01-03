import React, { useEffect } from "react";
import { useStatefulSearch } from "../hooks";
import {} from "../style/theme";
import {} from "../style/icons";

const SearchForFriends = ({ profileId, callback, searchCategory }) => {
    const [{ data }, handleSearchForFriends] = useStatefulSearch(
        profileId,
        searchCategory
    );
    useEffect(() => {
        console.log(data);

        callback(data);
    }, [data]);
    return (
        <React.Fragment>
            <input
                onChange={handleSearchForFriends}
                name="search"
                placeholder="Search..."
            />
        </React.Fragment>
    );
};

export default SearchForFriends;

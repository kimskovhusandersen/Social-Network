import React, { useState, useEffect } from "react";
import { useFetchData } from "./helpers";
import {
    SearchWrapper,
    SearchInput,
    SearchResult,
    SearchResultItem
} from "./theme";
import { Search as SearchIcon } from "./icons";

const Users = () => {
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
                const data = await useFetchData(
                    `/api/profiles/search/${userInput}`
                );
                !ignore && data && setProfiles(data);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [userInput]);

    return (
        <React.Fragment>
            <SearchWrapper>
                <SearchInput type="text" onChange={handleChange} />
                <SearchIcon />
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
        </React.Fragment>
    );
};

export default Users;

import React, { useState, useEffect } from "react";
import { useFetchData } from "./helpers";
import {
    SearchWrapper,
    SearchInput,
    SearchResult,
    SearchResultItem
} from "./theme";
import { Search as SearchIcon } from "./icons";

const FindPeople = () => {
    const [profiles, setProfiles] = useState([]);
    const [userInput, setUserInput] = useState("");
    const handleChange = event => setUserInput(event.target.value);

    useEffect(() => {
        let ignore;
        if (userInput == "") {
            setProfiles([]);
        } else {
            ignore = false;
            (async () => {
                const data = await useFetchData(
                    `/api/profiles/search/${userInput}`
                );
                !data && setProfiles([]);
                !ignore && data && setProfiles(data);
            })();
        }

        // A clean up fn, checks if the responses have come back in the correct order
        // This function is the equivalent to componentWillUnmount, which means it will run before the render function
        return () => {
            ignore = true;
        };
    }, [userInput]);

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

export default FindPeople;

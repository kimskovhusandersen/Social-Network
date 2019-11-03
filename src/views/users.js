import React, { useState, useEffect } from "react";
import { useFetchData } from "../helpers";
import {
    SearchWrapper,
    SearchInput,
    SearchResult,
    SearchResultItem
} from "../style/theme";
import { Search as SearchIcon } from "../style/icons";

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
                let data = await useFetchData(
                    `/api/profiles/search/${userInput}`
                );
                data = !Array.isArray(data) && data ? [data] : data;
                !ignore && !!data && setProfiles(data);
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
                            <img
                                src={profile.url || "/default-avatar.jpg"}
                                width="50px"
                                height="50px"
                            />
                            {profile.firstName} {profile.lastName}
                        </SearchResultItem>
                    ))}
                </SearchResult>
            </SearchWrapper>
        </React.Fragment>
    );
};

export default Users;

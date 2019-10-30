import React, { useState, useEffect } from "react";
import axios from "./axios_csurf";
import { handleErrors } from "./error-handler";
import { camelObjToKebab } from "./helpers";
import {
    SearchWrapper,
    SearchInput,
    SearchResult,
    SearchResultItem,
    Title2
} from "./theme";
import { Search as SearchIcon } from "./icons";

const Users = props => {
    const [profiles, setProfiles] = useState([]);
    const [userInput, setUserInput] = useState("");

    const handleChange = event => setUserInput(event.target.value);
    const handleKeyDown = event => console.log("hi");
    useEffect(() => {
        if (userInput == "") {
            (async () => {
                const { data } = await axios.get("/api/recent-profiles");
                if (data && data.name != "error") {
                    setProfiles(data);
                }
            })();
        }
        let ignore = false;
        (async () => {
            const { data } = await axios.get(
                `/api/profiles/search/${userInput}`
            );
            if (!ignore && data && data.name != "error") {
                setProfiles(data);
            }
        })();

        // A clean up fn, checks if the responses have come back in the correct order
        // This function is the equivalent to componentWillUnmount, which means it will run before the render function
        return () => {
            ignore = true;
        };
    }, [userInput]);

    return (
        <React.Fragment>
            <SearchWrapper onKeyDown={handleKeyDown}>
                <SearchInput type="text" onChange={handleChange} />
                <SearchIcon />
                <SearchResult>
                    {profiles.map(profile => (
                        <SearchResultItem
                            href={`/user/${profile.id}`}
                            key={profile.id}
                        >
                            {profile.first_name} {profile.last_name}
                        </SearchResultItem>
                    ))}
                </SearchResult>
            </SearchWrapper>
        </React.Fragment>
    );
};

export default Users;

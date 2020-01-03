import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useFetchData } from "./helpers";
import axios from "./axios_csurf";

export const useStatefulSearch = (profileId, searchCategory) => {
    const [fields, setFields] = useState({});
    const handleSearchForFriends = ({ target }) => {
        let ignore;
        (async () => {
            let data;
            if (target.value != "") {
                ignore = false;
                if (searchCategory == "friends") {
                    data = await useFetchData(
                        `/api/profiles/${profileId}/friends/search/${target.value}`
                    );
                } else {
                    data = await useFetchData(
                        `/api/profiles/search/${target.value}`
                    );
                }
                if (!data) {
                    data = [""];
                }
            }
            data = !data
                ? []
                : (data = !Array.isArray(data) && data ? [data] : data);
            if (!ignore && data) {
                setFields({
                    ...fields,
                    data: data
                });
            }
        })();
        return () => {
            ignore = true;
        };
    };
    return [fields, handleSearchForFriends];
};

export const useStatefulFields = () => {
    const [fields, setFields] = useState({});
    const handleChange = ({ target }) => {
        setFields({
            ...fields,
            [target.name]: target.value
        });
    };
    return [fields, handleChange];
};

export const useAuthSubmit = (url, fields) => {
    const [error, setError] = useState(false);
    const submit = async () => {
        const { data } = await axios.post(url, fields);
        if (!data.data == "success") {
            if (data.constraint == "profiles_email_key") {
                setError("email");
            }
            if (data.constraint == "profiles_password_key") {
                setError("password");
            }
        } else {
            location.replace("/");
        }
    };
    return [error, submit];
};

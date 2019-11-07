import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useFetchData } from "./helpers";

export const useStatefulSearch = profileId => {
    const [fields, setFields] = useState({});
    const handleSearchForFriends = ({ target }) => {
        let ignore;
        (async () => {
            if (target.value != "") {
                console.log("IN HOOK BEFORE DB", target.value);
                ignore = false;
                let data = await useFetchData(
                    `/api/profiles/${profileId}/friends/search/${target.value}`
                );
                console.log("IN HOOK", data);
                data = !Array.isArray(data) && data ? [data] : data;
                if (!ignore && data) {
                    setFields({
                        ...fields,
                        data: data
                    });
                }
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

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "./axios_csurf";

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

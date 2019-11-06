import React from "react";
import { useFetchData } from "../helpers";

const AuthLogout = () => {
    const handleClick = async () => {
        const { data } = await useFetchData(`/api/logout/`);
        if (data == "success") {
            window.location.replace("/welcome");
        }
    };
    return (
        <React.Fragment>
            <a onClick={handleClick}>Logout</a>
        </React.Fragment>
    );
};

export default AuthLogout;

import React from "react";
import { useStatefulFields, useAuthSubmit } from "./hooks";
import { Link } from "react-router-dom";

const AuthLogin = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/login", fields);
    return (
        <div>
            {!!error && error == "email" && <div>Sorry, incorrect email</div>}
            <input onChange={handleChange} name="email" placeholder="Email" />
            {!!error && error == "password" && (
                <div>Sorry, incorrect password</div>
            )}
            <input
                onChange={handleChange}
                name="password"
                placeholder="Password"
                type="password"
            />
            <button onClick={submit}>submit</button>
            Not yet registered? <Link to="/">Click here to register</Link>
        </div>
    );
};

export default AuthLogin;

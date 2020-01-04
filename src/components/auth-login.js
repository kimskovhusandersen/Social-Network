import React from "react";
import { useStatefulFields, useAuthSubmit } from "../hooks";
import { Link } from "react-router-dom";
import { FormWrapper } from "../style/forms";

const AuthLogin = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/login", fields);
    return (
        <FormWrapper>
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
        </FormWrapper>
    );
};

export default AuthLogin;

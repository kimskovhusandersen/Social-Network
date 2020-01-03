import React from "react";
import { useStatefulFields, useAuthSubmit } from "../hooks";
import { Link } from "react-router-dom";

import { FormWrapper } from "../style/forms";

const AuthRegistration = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/profiles", fields);
    return (
        <React.Fragment>
            <FormWrapper>
                <input
                    onChange={handleChange}
                    name="firstName"
                    placeholder="First name"
                />
                <input
                    onChange={handleChange}
                    name="lastName"
                    placeholder="Surname"
                />
                {!!error && error == "email" && (
                    <div>Sorry, email is already taken</div>
                )}
                <input
                    onChange={handleChange}
                    name="email"
                    placeholder="email"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <button onClick={submit}>submit</button>
                Already registered? <Link to="/login">Click here to login</Link>
            </FormWrapper>
        </React.Fragment>
    );
};

export default AuthRegistration;

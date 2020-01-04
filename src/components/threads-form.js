import React from "react";
import { useStatefulFields, useAuthSubmit } from "./hooks";
import { Link } from "react-router-dom";

const ThreadForm = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/login", fields);
    return (
        <div>
            <input onChange={handleChange} name="title" placeholder="title" />
            <button onClick={submit}>submit</button>
        </div>
    );
};

export default ThreadForm;

import React from "react";
import { useStatefulFields, useAuthSubmit } from "../../../hooks";

const BioForm = ({ aboutMe, handleSubmit }) => {
    const [fields, handleChange] = useStatefulFields();
    return (
        <React.Fragment>
            <input
                onChange={handleChange}
                name="aboutMe"
                placeholder="Write a short summary about yourself.."
            />
            <a onClick={() => handleSubmit(fields)}>Save</a>
        </React.Fragment>
    );
};

export default BioForm;

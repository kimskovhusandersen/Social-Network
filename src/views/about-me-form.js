import React from "react";
import { useStatefulFields, useAuthSubmit } from "../hooks";

const AboutMeForm = ({ aboutMe, handleSubmit }) => {
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

export default AboutMeForm;

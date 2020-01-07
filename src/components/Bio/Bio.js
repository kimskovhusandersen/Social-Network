import React from "react";
import { Edit2 } from "../../style/icons";
import classes from "./Bio.module.css";

const Bio = props => {
    let bio = "Add a short bio to tell people more about yourself.";
    if (props.bio) {
        bio = props.bio;
    }
    let edit = null;
    if (props.isBioEditVisible) {
        edit = (
            <a
                onClick={e =>
                    props.toggle(e, ["isBioFormVisible", "isBioVisible"])
                }
            >
                Edit <Edit2 height="16" width="16" />
            </a>
        );
    }

    return (
        <div className={classes.Bio}>
            <p>{bio}</p>
            {edit}
            {props.bioForm}
        </div>
    );
};

export default Bio;

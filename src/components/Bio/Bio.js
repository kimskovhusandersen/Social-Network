import React from "react";
import { Edit2 } from "../../style/icons";
import classes from "./Bio.module.css";

const Bio = ({ toggle, aboutMe, aboutMeForm }) => {
    return (
        <div className={classes.Bio}>
            <p>
                {aboutMe
                    ? aboutMe
                    : "Add a short bio to tell people more about yourself."}
            </p>
            {toggle && (
                <span
                    onClick={e =>
                        toggle(e, ["isAboutMeFormVisible", "isAboutMeVisible"])
                    }
                >
                    <a>
                        Edit <Edit2 height="16" width="16" />
                    </a>
                </span>
            )}

            {aboutMeForm}
        </div>
    );
};

export default Bio;

import React from "react";
import { Text, Button } from "../style/theme";

const AboutMe = ({ toggle, aboutMe, aboutMeForm }) => {
    return (
        <React.Fragment>
            <Text>
                {aboutMe
                    ? aboutMe
                    : "Add a short bio to tell people more about yourself."}
            </Text>
            <Button
                onClick={e =>
                    toggle(e, ["isAboutMeFormVisible", "isAboutMeVisible"])
                }
            >
                {aboutMe ? "Edit" : "Add"}
            </Button>
            {aboutMeForm}
        </React.Fragment>
    );
};

export default AboutMe;

import React from "react";
import { Text, Button } from "./theme";

const AboutMe = ({ toggle, aboutMe }) => {
    return (
        <React.Fragment>
            <Text>About me: {aboutMe ? aboutMe : "Unknown"}</Text>
            <Button
                onClick={e =>
                    toggle(e, ["isAboutMeFormVisible", "isAboutMeVisible"])
                }
            >
                {aboutMe ? "Edit" : "Add"}
            </Button>
        </React.Fragment>
    );
};

export default AboutMe;

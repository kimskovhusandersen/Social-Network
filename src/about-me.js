import React from "react";
import { Text, Button } from "./theme";

const AboutMe = ({ toggle, aboutMe }) => {
    return (
        <React.Fragment>
            <Text>About me: {aboutMe}</Text>
            <Button
                onClick={e =>
                    toggle(e, ["isAboutMeFormVisible", "isAboutMeVisible"])
                }
            >
                Edit About Me
            </Button>
        </React.Fragment>
    );
};

export default AboutMe;

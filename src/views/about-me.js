import React from "react";
import { AboutMeHeader, AboutMeBody } from "../style/about-me";
import { Edit2, Globe } from "../style/icons";

const AboutMe = ({ toggle, aboutMe, aboutMeForm }) => {
    return (
        <React.Fragment>
            <AboutMeHeader>
                <Globe />
                <span>Intro</span>
            </AboutMeHeader>
            <AboutMeBody>
                <p>
                    {aboutMe
                        ? aboutMe
                        : "Add a short bio to tell people more about yourself."}
                </p>
                {toggle && (
                    <span
                        onClick={e =>
                            toggle(e, [
                                "isAboutMeFormVisible",
                                "isAboutMeVisible"
                            ])
                        }
                    >
                        <a>
                            Edit <Edit2 height="16" width="16" />
                        </a>
                    </span>
                )}

                {aboutMeForm}
            </AboutMeBody>
        </React.Fragment>
    );
};

export default AboutMe;
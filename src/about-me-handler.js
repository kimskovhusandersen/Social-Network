import React from "react";
import { useFetchData, camelObjToKebab } from "./helpers";
// Views
import AboutMeForm from "./views/about-me-form";
import AboutMe from "./views/about-me";
import { AboutMeHeader } from "./style/about-me";
import { Globe } from "./style/icons";

class AboutMeHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}

    async handleSubmit(values) {
        values = camelObjToKebab(values);
        const data = await useFetchData(`api/my-profile/edit`, values);
        data && this.props.upsertState("profile", data);
        this.props.toggle(null, ["isAboutMeFormVisible", "isAboutMeVisible"]);
    }

    render() {
        const {
            aboutMe,
            isAboutMeVisible,
            isAboutMeFormVisible,
            toggle
        } = this.props;
        return (
            <React.Fragment>
                <AboutMeHeader>
                    <Globe />
                    <span>Intro</span>
                </AboutMeHeader>
                {isAboutMeVisible && (
                    <AboutMe aboutMe={aboutMe} toggle={toggle} />
                )}
                {isAboutMeFormVisible && (
                    <AboutMeForm
                        aboutMe={aboutMe}
                        toggle={toggle}
                        handleSubmit={values => this.handleSubmit(values)}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default AboutMeHandler;

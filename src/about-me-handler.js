import React from "react";
import AboutMeFormWithFormik from "./views/about-me-form";
import { handleErrors } from "./error-handler";
import { useFetchData, camelObjToKebab } from "./helpers";

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

    async handleErrors(err) {
        handleErrors(err);
    }

    render() {
        const { aboutMe, toggle } = this.props;
        return (
            <React.Fragment>
                <AboutMeFormWithFormik
                    aboutMe={aboutMe}
                    toggle={toggle}
                    handleSubmit={values => this.handleSubmit(values)}
                    handleErrors={errors => this.handleErrors(errors)}
                />
            </React.Fragment>
        );
    }
}

export default AboutMeHandler;

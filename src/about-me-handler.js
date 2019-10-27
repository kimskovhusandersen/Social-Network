import React from "react";
import { Title2 } from "./theme";
import AboutMeFormWithFormik from "./about-me-form";
import { handleErrors } from "./error-handler";
import { camelObjToKebab } from "./helpers";

import axios from "./axios_csurf";

class AboutMeHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}

    async handleSubmit(values) {
        values = camelObjToKebab(values);
        const { data } = await axios.post("/update-profile", values);
        if (data && data.name != "error") {
            await this.props.upsertState("profile", data[0]);
        } else {
            await this.handleErrors(data);
        }
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

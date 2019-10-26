import React from "react";
import { Title2 } from "./theme";
import AboutMeFormWithFormik from "./about-me-form";
import { handleErrors } from "./error-handler";

import axios from "./axios_csurf";

class BioHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    async handleSubmit(values) {
        console.log("INSIDE HANDLER", values);
    }
    async handleErrors(err) {
        handleErrors(err);
    }
    render() {
        const { bio } = this.props;
        return (
            <React.Fragment>
                <Title2>I am the bio editor</Title2>
                <AboutMeFormWithFormik
                    bio={bio}
                    handleSubmit={values => this.handleSubmit(values)}
                    handleErrors={errors => this.handleErrors(errors)}
                />
            </React.Fragment>
        );
    }
}

export default BioHandler;

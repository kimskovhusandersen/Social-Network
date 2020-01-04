import React, { Component } from "react";
import { useFetchData, camelObjToKebab } from "../../helpers";
import { Globe } from "../../style/icons";
// Views

import Bio from "../../components/Bio/Bio.js";
import BioForm from "../../components/Bio/BioForm/BioForm";
import classes from "./BioHandler.module.css";

class BioHandler extends Component {
    async handleSubmit(values) {
        values = camelObjToKebab(values);
        const data = await useFetchData(`api/my-profile/edit`, values);
        data && this.props.upsertState("profile", data);
        this.props.toggle(null, ["isAboutMeFormVisible", "isAboutMeVisible"]);
    }

    render() {
        let bio = null;
        let bioForm = null;
        if (this.props.aboutMe && this.props.isAboutMeVisible) {
            bio = (
                <Bio aboutMe={this.props.aboutMe} toggle={this.props.toggle} />
            );
        }
        if (this.props.aboutMe && this.props.isAboutMeFormVisible) {
            bioForm = (
                <BioForm
                    aboutMe={this.props.aboutMe}
                    toggle={this.props.toggle}
                    handleSubmit={values => this.handleSubmit(values)}
                />
            );
        }

        return (
            <React.Fragment>
                <div className={classes.BioHeader}>
                    <Globe />
                    <span>Intro</span>
                </div>
                {bio}
                {bioForm}
            </React.Fragment>
        );
    }
}

export default BioHandler;

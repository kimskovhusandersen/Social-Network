import React from "react";
import PhotoFormWithFormik from "../components/photo-form";
import { errorHandler } from "../error-handler";
import { useFetchData } from "../helpers";

class ProfilePhotoHandler extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
        this.maxFileSize = 2097152;
    }
    async handleSubmit({ photo, caption }) {
        const { upsertState } = this.props;
        const fd = new FormData();
        fd.append("photo", photo);
        fd.append("caption", caption);
        fd.append("album", "profile_photos");
        const data = await useFetchData("/api/photos", fd);
        data &&
            upsertState("photos", {
                profilePhotoUrl: data.url
            });
    }

    async handleErrors(err) {
        await errorHandler(err);
    }

    render() {
        const { toggle } = this.props;
        return (
            <React.Fragment>
                <PhotoFormWithFormik
                    toggle={toggle}
                    handleSubmit={values => this.handleSubmit(values)}
                    maxFileSize={this.maxFileSize}
                />
            </React.Fragment>
        );
    }
}

export default ProfilePhotoHandler;
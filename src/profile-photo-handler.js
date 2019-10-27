import React from "react";
import PhotoFormWithFormik from "./photo-form";
import { errorHandler } from "./error-handler";
import { Title2 } from "./theme";
import axios from "./axios_csurf";

class ProfilePhotoHandler extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
        this.maxFileSize = 2097152;
    }
    async handleSubmit({ photo, caption, profileId }) {
        const fd = new FormData();
        fd.append("photo", photo);
        fd.append("caption", caption);
        fd.append("album", "profile_photos");
        const { data } = await axios.post("/photos", fd);

        if (data && data.name != "error") {
            await this.props.upsertState("photos", {
                profilePhotoUrl: data[0].url
            });
        } else {
            await this.handleErrors(data);
        }
    }

    async handleErrors(err) {
        await errorHandler(err);
    }

    render() {
        const { toggle } = this.props;
        return (
            <React.Fragment>
                <Title2>Upload profile photo</Title2>
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

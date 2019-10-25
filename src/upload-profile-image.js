import React from "react";
import UploadImageFormWithFormik from "./upload-image-form";
import { PageWrapper, Title2 } from "./theme";
import axios from "./axios_csurf";
class UploadProfileImage extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.maxFileSize = 2097152;
    }
    async handleSubmit({ image, caption, userId }) {
        console.log("INSIDE PROF UPLOADER", image, caption, userId);
        const fd = new FormData();
        fd.append("image", image);
        fd.append("caption", caption);
        fd.append("userId", userId);
        fd.append("user_profile_image", true);
        const { data } = await axios.post("/images", fd);
        console.log("WHAT's the DATA?", data[0].image_url);
        console.log("NO ERRORS", data.name != "error", console.log(data));
        if (data.name != "error") {
            return this.props.upsertState("user", {
                profileImageUrl: data[0].image_url
            });
        } else {
            return data;
        }
    }
    render() {
        return (
            <PageWrapper>
                <Title2>Upload profile photo</Title2>
                <UploadImageFormWithFormik
                    handleSubmit={values => this.handleSubmit(values)}
                    userId="1"
                    maxFileSize={this.maxFileSize}
                />
            </PageWrapper>
        );
    }
}

export default UploadProfileImage;

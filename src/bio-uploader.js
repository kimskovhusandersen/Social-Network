import React from "react";
import UploadImageFormWithFormik from "./upload-image-form";
import { PageWrapper, Title2 } from "./theme";
import axios from "./axios_csurf";
class BioUploader extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.maxFileSize = 2097152;
    }
    async handleSubmit() {
        await axios.post("/user_profiles");
    }
    render() {
        return (
            <React.Fragment>
                <p>I'm the bio uploader</p>
            </React.Fragment>
        );
    }
}

export default BioUploader;

import React from "react";
import UploadImageFormWithFormik from "./upload-image-form";
import { PageWrapper, Image, Title2, Text, Button } from "./theme";

class Sascha extends React.Component {
    constructor() {
        super();
        this.state = {
            userProfilePicture: ""
        };
        this.maxFileSize = 2097152;
    }

    componentDidMount() {
        // console.log("Sacha mounted!");
        // console.log("this.props");
    }

    muffinMaker() {
        this.props.methodInApp("Looooooooooots of muffins");
    }

    render() {
        return (
            <PageWrapper>
                <Title2>Upload profile picture</Title2>
                <UploadImageFormWithFormik
                    handleSubmit={this.props.handleSubmit}
                    userId="1"
                    maxFileSize={this.maxFileSize}
                />
            </PageWrapper>
        );
    }
}

export default Sascha;

// Third-party library used: Formik, react-dropzone
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "./axios_csurf";
import { Button, Text, Label, Input } from "./theme";

const UploadImageForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue
}) => (
    <Form>
        <Label>
            {touched.file && errors.file && <Text>{errors.file}</Text>}
            <input
                id="image"
                name="image"
                accept="image/*"
                type="file"
                onChange={async event => {
                    await setFieldValue("image", event.currentTarget.files[0]);
                }}
            />
        </Label>
        <Label>
            {touched.caption && errors.caption && <Text>{errors.caption}</Text>}
            <Input
                type="text"
                name="caption"
                placeholder="Write a caption.."
                values={values.caption}
            />
        </Label>
        <Input type="hidden" name="userId" values={values.userId} required />
        <Button disabled={isSubmitting} type="submit">
            Submit
        </Button>
    </Form>
);
const UploadImageFormWithFormik = withFormik({
    mapPropsToValues({ image, caption, userId }) {
        return {
            image: image || "",
            caption: caption || "",
            userId: userId || ""
        };
    },
    validationSchema: Yup.object().shape({
        caption: Yup.string().required(),
        userId: Yup.number().required()
    }),

    async handleSubmit(
        { caption, image, userId },
        { props, resetForm, setErrors, setSubmitting }
    ) {
        if (image.size > props.maxFileSize) {
            return setErrors({
                file: "Sorry, the file can't be larger than 2.0 MB"
            });
        }
        const fd = new FormData();
        fd.append("image", image);
        fd.append("caption", caption);
        fd.append("userId", userId);

        const { data } = await axios.post("/images", fd);
        console.log("BACK IN REACT. DATA:", data);
        if (data.name == "error") {
            console.log(data);
        } else {
            props.handleSubmit(data);
        }
        setSubmitting(false);
    }
})(UploadImageForm);
export default UploadImageFormWithFormik;

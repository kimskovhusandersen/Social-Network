// Third-party library used: Formik, react-dropzone
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { Button, Text, Label, Input } from "./theme";

const UploadPhotoForm = ({
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
                id="photo"
                name="photo"
                accept="photo/*"
                type="file"
                onChange={async event => {
                    await setFieldValue("photo", event.currentTarget.files[0]);
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
        <Button disabled={isSubmitting} type="submit">
            Submit
        </Button>
    </Form>
);
const UploadPhotoFormWithFormik = withFormik({
    mapPropsToValues({ photo, caption }) {
        return {
            photo: photo || "",
            caption: caption || ""
        };
    },
    validationSchema: Yup.object().shape({
        caption: Yup.string()
    }),

    async handleSubmit(
        values,
        {
            props: { handleSubmit, maxFileSize },
            resetForm,
            setErrors,
            setSubmitting
        }
    ) {
        if (values.photo.size > maxFileSize) {
            return setErrors({
                file: "Sorry, the file can't be larger than 2.0 MB"
            });
        }
        const result = await handleSubmit(values);
        if (result && result.name == "error") {
            console.log(result);
        } else {
            resetForm();
        }
        setSubmitting(false);
    }
})(UploadPhotoForm);
export default UploadPhotoFormWithFormik;

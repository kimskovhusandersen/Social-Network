// Third-party library used: Formik, react-dropzone
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
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
        caption: Yup.string(),
        userId: Yup.number().required()
    }),

    async handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
        const { image } = values;
        if (image.size > props.maxFileSize) {
            return setErrors({
                file: "Sorry, the file can't be larger than 2.0 MB"
            });
        }
        const result = await props.handleSubmit(values);
        console.log("RESULT IS?", result);
        if (result && result.name == "error") {
            console.log(result);
        } else {
            resetForm();
        }
        setSubmitting(false);
    }
})(UploadImageForm);
export default UploadImageFormWithFormik;

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { Label, Input } from "../../../style/theme";

const ProfilePhotoForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    toggle
}) => (
    <Form>
        <Label>
            {touched.file && errors.file && <p>{errors.file}</p>}
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
            {touched.caption && errors.caption && <p>{errors.caption}</p>}
            <Input
                type="text"
                name="caption"
                placeholder="Write a caption.."
                values={values.caption}
            />
        </Label>
        <button disabled={isSubmitting} type="submit">
            Submit
        </button>
        <button onClick={e => toggle(e, "isPhotoUploaderVisible")}>Back</button>
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
})(ProfilePhotoForm);
export default UploadPhotoFormWithFormik;

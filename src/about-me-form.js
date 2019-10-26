import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { Button, Label, Input, Text } from "./theme";

const BioForm = ({ values, errors, touched, isSubmitting }) => (
    <Form>
        <Label>
            {touched.bio && errors.bio && <Text>{errors.bio}</Text>}
            <Input
                component="textarea"
                name="bio"
                placeholder="Write something about yourself.."
                values={values.bio}
            />
        </Label>
        <Button disabled={isSubmitting} type="submit">
            Save
        </Button>
    </Form>
);
const BioFormWithFormik = withFormik({
    mapPropsToValues({ bio }) {
        return {
            bio: bio || ""
        };
    },
    validationSchema: Yup.object().shape({
        bio: Yup.string()
    }),

    async handleSubmit(
        values,
        {
            props: { handleSubmit, handleErrors },
            setErrors,
            setSubmitting
        }
    ) {
        try {
            const data = await handleSubmit(values);
            if (data && data.name == "error") {
                setErrors({ bio: "Sorry, something went wrong" });
            }
        } catch (err) {
            handleErrors(err);
        }
        setSubmitting(false);
    }
})(BioForm);
export default BioFormWithFormik;

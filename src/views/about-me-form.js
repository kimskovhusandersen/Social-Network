import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { Button, Label, Input, Text } from "../style/theme";

const AboutMeForm = ({ values, errors, touched, isSubmitting, toggle }) => (
    <Form>
        <Label>
            {touched.aboutMe && errors.aboutMe && <Text>{errors.aboutMe}</Text>}
            <Input
                component="textarea"
                name="aboutMe"
                placeholder="Write something about yourself.."
                values={values.aboutMe}
            />
        </Label>
        <Button disabled={isSubmitting} type="submit">
            Save
        </Button>
    </Form>
);
const AboutMeFormWithFormik = withFormik({
    mapPropsToValues({ aboutMe }) {
        return {
            aboutMe: aboutMe || ""
        };
    },
    validationSchema: Yup.object().shape({
        aboutMe: Yup.string()
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
            console.log("triggering handleSubmit next", values);
            const data = await handleSubmit(values);
            if (data && data.name == "error") {
                setErrors({ aboutMe: "Sorry, something went wrong" });
            }
        } catch (err) {
            handleErrors(err);
        }
        setSubmitting(false);
    }
})(AboutMeForm);
export default AboutMeFormWithFormik;

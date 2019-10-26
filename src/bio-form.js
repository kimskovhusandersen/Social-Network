// Third-party library used: Formik
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "./axios_csurf";
import { Button, Label, Input, Text } from "./theme";
import errorHandler from "./error-handler";

const BioForm = ({ values, errors, touched, isSubmitting }) => (
    <Form>
        <Label>
            {touched.bio && errors.bio && <Text>{errors.bio}</Text>}
            <Input
                component="textarea"
                name="bio"
                placeholder="Bio"
                values={values.bio}
            />
        </Label>
        <Button disabled={isSubmitting} type="submit">
            Submit
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

    async handleSubmit(values, { setErrors, setSubmitting }) {
        console.log("hi BIo");
        //
        // try {
        //     const { data } = await axios.post("/login", values);
        //     if (data.name == "error") {
        //         if (data.constraint == "users_email_key") {
        //             setErrors({ email: "Sorry, can't find that email" });
        //         } else if (data.constraint == "users_password_key") {
        //             setErrors({
        //                 password: "Sorry, that password is incorrect"
        //             });
        //         }
        //     } else {
        //         console.log("REDIRECTING");
        //         location.replace("/");
        //     }
        // } catch (err) {
        //     errorHandler(err);
        // }
        // setSubmitting(false);
    }
})(BioForm);
export default BioFormWithFormik;

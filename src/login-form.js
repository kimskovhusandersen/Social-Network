// Third-party library used: Formik
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "./axios_csurf";
import { Button, Text, Label, Input } from "./theme";

const LoginForm = ({ values, errors, touched, isSubmitting }) => (
    <Form>
        <Label>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Input
                type="email"
                name="email"
                placeholder="Email"
                values={values.email}
            />
        </Label>
        <Label>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Input
                type="password"
                name="password"
                placeholder="Password"
                values={values.password}
            />
        </Label>
        <Button disabled={isSubmitting} type="submit">
            Submit
        </Button>
    </Form>
);
const LoginFormWithFormik = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || ""
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string().required()
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        console.log("LOGGING values", values);
        return axios
            .post("/login", values)
            .then(({ data }) => {
                if (data.name == "error") {
                    if (data.constraint == "users_email_key") {
                        setErrors({ email: "Sorry, can't find that email" });
                    } else if (data.constraint == "users_password_key") {
                        setErrors({
                            password: "Sorry, that password is incorrect"
                        });
                    }
                } else {
                    resetForm();
                    window.location = "/";
                }
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
            });
    }
})(LoginForm);
export default LoginFormWithFormik;

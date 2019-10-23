// Third-party library used: Formik
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginForm = ({ values, errors, touched, isSubmitting }) => (
    <Form>
        <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field
                type="email"
                name="email"
                placeholder="Email"
                values={values.email}
            />
        </div>
        <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field
                type="password"
                name="password"
                placeholder="Password"
                values={values.password}
            />
        </div>
        <button disabled={isSubmitting} type="submit">
            Submit
        </button>
    </Form>
);
const LoginFormWithFormik = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || ""
        };
    },

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        setTimeout(() => {
            if (values.email === "kimskovhusandersen@gmail.com") {
                setErrors({ email: "That email is already taken" });
            } else {
                resetForm();
            }
            setSubmitting(false);
        }, 1000);
        console.log(values);
    }
})(LoginForm);
export default LoginFormWithFormik;

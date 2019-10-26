import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { Button, Text, Label, Input } from "./theme";

const AuthenticationForm = ({ values, errors, touched, isSubmitting }) => (
    <Form>
        <Label>
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <Input
                type="email"
                name="email"
                placeholder="Email"
                values={values.email}
            />
        </Label>
        <Label>
            {touched.password && errors.password && (
                <Text>{errors.password}</Text>
            )}
            <Input
                type="password"
                name="password"
                placeholder="Password"
                values={values.password}
            />
        </Label>
        <Button disabled={isSubmitting} type="submit">
            Continue
        </Button>
    </Form>
);

const AuthenticationFormWithFormik = withFormik({
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
        password: Yup.string()
            .min(9)
            .required()
    }),

    async handleSubmit(
        values,
        {
            props: { handleSubmit, errors },
            setErrors,
            setSubmitting
        }
    ) {
        await handleSubmit(values);
        console.log("done");
        if (Object.entries(errors).length != 0) {
            setErrors(errors);
            setSubmitting(false);
        } else {
            location.replace("/");
        }
    }
})(AuthenticationForm);

export default AuthenticationFormWithFormik;

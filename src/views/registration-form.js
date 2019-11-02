import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { Button, Text, Label, Input, Link } from "../style/theme";

const RegistrationForm = ({ values, errors, touched, isSubmitting }) => (
    <React.Fragment>
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
            <Label>
                {touched.firstName && errors.firstName && (
                    <Text>{errors.firstName}</Text>
                )}
                <Input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    values={values.firstName}
                />
            </Label>
            <Label>
                {touched.lastName && errors.lastName && (
                    <Text>{errors.lastName}</Text>
                )}
                <Input
                    type="text"
                    name="lastName"
                    placeholder="Surname"
                    values={values.lastName}
                />
            </Label>
            <Button disabled={isSubmitting} type="submit">
                Continue
            </Button>
        </Form>
        <Text>
            Already registered? <Link to="/login">Login!</Link>
        </Text>
    </React.Fragment>
);

const RegistrationFormWithFormik = withFormik({
    mapPropsToValues({ email, password, firstName, lastName }) {
        return {
            email: email || "",
            password: password || "",
            firstName: firstName || "",
            lastName: lastName || ""
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .min(9)
            .required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required()
    }),

    async handleSubmit(
        values,
        {
            props: { submit, errors },
            setErrors,
            setSubmitting
        }
    ) {
        await submit(values);
        if (Object.entries(errors).length != 0) {
            setErrors(errors);
            setSubmitting(false);
        } else {
            location.replace("/");
        }
    }
})(RegistrationForm);

export default RegistrationFormWithFormik;

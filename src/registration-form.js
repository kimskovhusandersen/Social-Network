// Third-party library used: Formik
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "./axios_csurf";
import errorHandler from "./error-handler";
import { Button, Text, Label, Input } from "./theme";
import { optionsYear, optionsMonth, optionsDay } from "./helpers";

const RegistrationForm = ({ values, errors, touched, isSubmitting }) => (
    <Form>
        <Label>
            {touched.firstname && errors.firstname && (
                <Text color="tomato">{errors.email}</Text>
            )}
            <Input
                type="text"
                name="firstname"
                placeholder="First name"
                values={values.firstname}
            />
        </Label>
        <Label>
            {touched.lastname && errors.lastname && <p>{errors.lastname}</p>}
            <Input
                type="text"
                name="lastname"
                placeholder="Surname"
                values={values.lastname}
            />
        </Label>
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
        <Label>
            {touched.birthday_day && errors.birthday_day && (
                <p>{errors.birthday_day}</p>
            )}
            <Input component="select" name="birthday_day">
                <option value="0">Day</option>
                {optionsDay()}
            </Input>
        </Label>
        <Label>
            {touched.birthday_month && errors.birthday_month && (
                <p>{errors.birthday_month}</p>
            )}
            <Input component="select" name="birthday_month">
                <option value="0">Month</option>
                {optionsMonth()}
            </Input>
        </Label>
        <Label>
            {touched.birthday_year && errors.birthday_year && (
                <p>{errors.birthday_year}</p>
            )}

            <Input component="select" name="birthday_year">
                <option value="0">Year</option>
                {optionsYear()}
            </Input>
        </Label>
        <Label>
            {touched.newsletter && errors.newsletter && (
                <p>{errors.newsletter}</p>
            )}
        </Label>
        <Label>
            <Input
                type="checkbox"
                name="newsletter"
                checked={values.newsletter}
            />
            Join our newsletter
        </Label>

        <Button disabled={isSubmitting} type="submit">
            Submit
        </Button>
    </Form>
);

const RegistrationFormikForm = withFormik({
    mapPropsToValues({
        firstname,
        lastname,
        email,
        password,
        newsletter,
        birthday_day,
        birthday_month,
        birthday_year
    }) {
        return {
            firstname: firstname || "",
            lastname: lastname || "",
            email: email || "",
            password: password || "",
            newsletter: newsletter || false,
            birthday_day: birthday_day || 0,
            birthday_month: birthday_month || 0,
            birthday_year: birthday_year || 0
        };
    },
    validationSchema: Yup.object().shape({
        firstname: Yup.string().required(),
        lastname: Yup.string().required(),
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .min(9)
            .required(),
        birthday_day: Yup.number().required(),
        birthday_month: Yup.number().required(),
        birthday_year: Yup.number().required()
    }),

    async handleSubmit(values, { setErrors, setSubmitting }) {
        try {
            const { data } = await axios.post("/users", values);
            console.log("LOGGING IN REG FORM", data);
            if (data.name == "error") {
                if (data.constraint == "users_email_key") {
                    setErrors({ email: "That email is already taken" });
                }
            } else {
                location.replace("/");
            }
            setSubmitting(false);
        } catch (err) {
            errorHandler(err);
        }
    }
})(RegistrationForm);

export default RegistrationFormikForm;

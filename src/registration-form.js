// Third-party library used: Formik
// sources: https://www.youtube.com/watch?v=yNiJkjEwmpw

import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "./axios_csurf";

import { Button, Text, Label, Input } from "./theme";

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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
            </Input>
        </Label>
        <Label>
            {touched.birthday_month && errors.birthday_month && (
                <p>{errors.birthday_month}</p>
            )}
            <Input component="select" name="birthday_month">
                <option value="0">Month</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">Jul</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
            </Input>
        </Label>
        <Label>
            {touched.birthday_year && errors.birthday_year && (
                <p>{errors.birthday_year}</p>
            )}

            <Input component="select" name="birthday_year">
                <option value="0">Year</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
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

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        console.log("LOGGING values", values);
        return axios
            .post("/users", values)
            .then(data => {
                console.log("BACK IN REACT", data);
                if (data.name == "error") {
                    if (data.constraint == "users_email_key") {
                        setErrors({ email: "That email is already taken" });
                    }
                } else {
                    resetForm();
                }
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
            });
    }
})(RegistrationForm);

export default RegistrationFormikForm;
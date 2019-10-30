import React from "react";
import RegistrationFormWithFormik from "./registration-form";
import { errorHandler } from "./error-handler";
import axios from "./axios_csurf";
import { Text } from "./theme";
import { Link } from "react-router-dom";

class RegistrationHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Kim",
            lastName: "Andersen",
            email: "kimskovhusandersen@gmail.com",
            password: "123456789",
            errors: {}
        };
    }

    async componentDidMount() {}

    async submit(values) {
        const { data } = await axios.post("/api/profiles", values);

        if (data && data.name == "error") {
            if (data.constraint == "profiles_email_key") {
                await this.setState({
                    errors: { email: "That email is already taken" }
                });
            }
        }
    }
    async handleErrors(err) {
        await errorHandler(err);
    }

    render() {
        const { firstName, lastName, email, password, errors } = this.state;
        return (
            <React.Fragment>
                <RegistrationFormWithFormik
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    password={password}
                    errors={errors}
                    submit={values => this.submit(values)}
                    handleErrors={err => this.handleErrors(err)}
                />
                <Text>
                    Already registered? <Link to="/login">Login!</Link>
                </Text>
            </React.Fragment>
        );
    }
}

export default RegistrationHandler;

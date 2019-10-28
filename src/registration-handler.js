import React from "react";
import AuthenticationFormWithFormik from "./authentication-form";
import { errorHandler } from "./error-handler";
import axios from "./axios_csurf";
import { Text } from "./theme";
import { Link } from "react-router-dom";

class RegistrationHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "kimskovhusandersen@gmail.com",
            password: "123456789",
            errors: {}
        };
    }

    async componentDidMount() {}

    async handleSubmit(values) {
        const { data } = await axios.post("/api/profiles", values);
        if (data && data.name == "error") {
            if (data.constraint == "profiles_email_key") {
                this.setState({
                    errors: { email: "That email is already taken" }
                });
            }
        }
    }
    async handleErrors(err) {
        await errorHandler(err);
    }

    render() {
        const { email, password, errors } = this.state;
        return (
            <React.Fragment>
                <AuthenticationFormWithFormik
                    email={email}
                    password={password}
                    errors={errors}
                    handleSubmit={values => this.handleSubmit(values)}
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

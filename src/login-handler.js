import React from "react";
import LoginFormWithFormik from "./views/login-form";
import { errorHandler } from "./error-handler";
import axios from "./axios_csurf";

class LoginHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "kimskovhusandersen@gmail.com",
            password: "1234",
            errors: {}
        };
    }

    async componentDidMount() {}

    async handleSubmit(values) {
        const { data } = await axios.post("/login", values);
        if (data && data.name == "error") {
            if (data.constraint == "profiles_email_key") {
                this.setState({
                    errors: { email: "Sorry, can't find that email" }
                });
            } else if (data.constraint == "profiles_password_key") {
                this.setState({
                    errors: { password: "Sorry, that password is incorrect" }
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
                <LoginFormWithFormik
                    email={email}
                    password={password}
                    errors={errors}
                    handleSubmit={values => this.handleSubmit(values)}
                    handleErrors={err => this.handleErrors(err)}
                />
            </React.Fragment>
        );
    }
}

export default LoginHandler;

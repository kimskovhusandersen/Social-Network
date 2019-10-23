import React from "react";
import LoginForm from "./login-form";
// import axios from "./axios_csurf";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit() {}
    render() {
        return (
            <React.Fragment>
                <LoginForm
                    email="kimskovhusandersen@gmail.com"
                    password="1234"
                />
            </React.Fragment>
        );
    }
}

export default Login;

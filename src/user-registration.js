import React from "react";
import RegistrationFormikForm from "./registration-form";
import axios from "./axios_csurf";
import { Link } from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    handleSubmit() {}
    render() {
        return (
            <React.Fragment>
                <RegistrationFormikForm
                    setUser={this.props.setUser}
                    handleSubmit={this.handleSubmit.bind(this)}
                    firstname="Kim"
                    lastname="Andersen"
                    email="kimskovhusandersen@gmail.com"
                    password="123456789"
                    birthday_day="24"
                    birthday_month="4"
                    birthday_year="1987"
                />
                <p>
                    Already registered? <Link to="/login">Login!</Link>
                </p>
            </React.Fragment>
        );
    }
}

export default Registration;

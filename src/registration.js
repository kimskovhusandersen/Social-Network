import React from "react";
import RegistrationFormikForm from "./registration-form";
import axios from "./axios_csurf";
import { Link } from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get("/users/")
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });

        setTimeout(() => {
            this.setState({ name: "Kim" });
        }, 2000);
    }

    handleSubmit(formdata) {
        axios
            .post("/register", { formdata })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <React.Fragment>
                <RegistrationFormikForm
                    firstname="Kim"
                    lastname="Andersen"
                    email="kimskovhusandersen@gmail.com"
                    password="1234"
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

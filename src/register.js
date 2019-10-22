import React from "react";
import RegisterFormikForm from "./register-form";
import axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
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
                {this.state.error && <div>{this.state.error}</div>}
                <RegisterFormikForm
                    firstname="Kim"
                    lastname="Andersen"
                    email="kimskovhusandersen@gmail.com"
                    password="1234"
                    birthday_day="24"
                    birthday_month="4"
                    birthday_year="1987"
                />
            </React.Fragment>
        );
    }
}

export default Register;

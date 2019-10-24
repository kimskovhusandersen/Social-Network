import React from "react";
import ProfilePic from "./profile-pic";
import Sascha from "./sascha";

import { CodeWrapper, Logo, Title } from "./theme";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                addresses: [
                    {
                        street: "",
                        number: null,
                        postalCode: null,
                        city: "",
                        state: "",
                        country: ""
                    }
                ],
                birthdayDay: null,
                birthdayYear: null,
                birthdayMonth: null,
                email: "",
                firstname: "",
                lastname: "",
                profilePicture: ""
            },
            isSaschaVisible: false
        };

        this.toggleSascha = this.toggleSascha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // console.log("App mounted!!!");
        // Make get request to get all information about the user
    }
    toggleSascha() {
        this.setState({ isSaschaVisible: !this.state.isSaschaVisible });
    }
    handleSubmit({ url }) {
        this.setState(prevState => ({
            user: {
                // object that we want to update
                ...prevState.user, // keep all other key-value pairs
                profilePicture: url // update the value of specific key
            }
        }));
    }

    render() {
        return (
            <CodeWrapper>
                <Logo />
                <Title onClick={this.toggleSascha}>
                    Welcome to Social Media!
                </Title>
                <ProfilePic
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    profilePicture={this.state.user.profilePicture}
                    toggleSascha={this.toggleSascha}
                />
                {this.state.isSaschaVisible && (
                    <Sascha handleSubmit={this.handleSubmit} />
                )}
            </CodeWrapper>
        );
    }
}

export default App;

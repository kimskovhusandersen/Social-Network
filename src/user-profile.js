import React from "react";
import { Title, Text } from "./theme";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { user, profileImage, bio } = this.props;
        return (
            <React.Fragment>
                <Title>Details About You</Title>
                <React.Fragment>Profile Image: {profileImage}</React.Fragment>
                <Text>
                    Name: {user.firstname} {user.lastname}
                </Text>
                <Text>Email: {user.email}</Text>
                <Text>
                    Birthday:
                    {user.birthdayDay}/{user.birthdayMonth}/{user.birthdayYear}
                </Text>
                <Text>Biography:{bio}</Text>
            </React.Fragment>
        );
    }
}

export default Profile;

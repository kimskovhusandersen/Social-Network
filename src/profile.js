import React from "react";
import { Title, Text } from "./theme";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { profile, profilePhoto, bio } = this.props;
        return (
            <React.Fragment>
                <Title>Details About You</Title>
                <React.Fragment>Profile Photo: {profilePhoto}</React.Fragment>
                <Text>
                    Name: {profile.firstName} {profile.lastName}
                </Text>
                <Text>Email: {profile.email}</Text>
                <Text>
                    Birthday:
                    {profile.birthdayDay}/{profile.birthdayMonth}/
                    {profile.birthdayYear}
                </Text>
                <Text>Biography:{bio}</Text>
            </React.Fragment>
        );
    }
}

export default Profile;

import React from "react";
import { Title, Text, Button } from "./theme";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { profile, profilePhoto, aboutMe } = this.props;
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
                {aboutMe}
            </React.Fragment>
        );
    }
}

export default Profile;

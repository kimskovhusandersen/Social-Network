import React from "react";
import { Title, Text, Button } from "./theme";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            profile,
            profilePhoto,
            profileTopSection,
            aboutMe
        } = this.props;
        return (
            <React.Fragment>
                {profileTopSection}
                <Title>Details About You</Title>
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

import React from "react";
import { PageWrapper, Logo, Title } from "./theme";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { user, profileEditor, profileImage } = this.props;
        return (
            <React.Fragment>
                {profileImage}
                <Title>{user.firstname}</Title>
                {profileEditor}
                {user.email}
                {user.birthday_year}
            </React.Fragment>
        );
    }
}

export default Profile;

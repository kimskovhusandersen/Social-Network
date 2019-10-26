import React from "react";

import { Text, Button } from "./theme";

const UserBio = ({ bio, toggleVisibility }) => {
    return (
        <React.Fragment>
            {bio}
            <Button onClick={toggleVisibility}>Edit</Button>
        </React.Fragment>
    );
};

export default UserBio;

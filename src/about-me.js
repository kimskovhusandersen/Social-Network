import React from "react";
import { Button } from "./theme";

const UserBio = ({ toggle, bio }) => {
    return (
        <React.Fragment>
            {bio}
            <Button onClick={e => toggle(e, "isBioEditorVisible")}>
                Update bio
            </Button>
        </React.Fragment>
    );
};

export default UserBio;

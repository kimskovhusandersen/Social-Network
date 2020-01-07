import React, { Component, Fragment } from "react";
import FindFriendsBuilder from "../../containers/FindFriendsBuilder/FindFriendsBuilder";
import classes from "./FindFriendsLayout.module.css";

class FindFriendsLayout extends Component {
    render() {
        return (
            <main className={classes.FindFriendsLayout}>
                <div className={classes.ProfilePageWrapper}>
                    <div className={classes.ProfileInnerPage}>
                        <FindFriendsBuilder />
                    </div>
                </div>
            </main>
        );
    }
}
export default FindFriendsLayout;

import React, { Component, Fragment } from "react";
import FindFriendsBuilder from "../../containers/FindFriendsBuilder/FindFriendsBuilder";
import classes from "./FindFriendsLayout.module.css";

class HomeLayout extends Component {
    render() {
        return (
            <Fragment>
                <main>
                    <h1>Find Friends Layout</h1>
                    <div className={classes.ProfilePageWrapper}>
                        <div className={classes.ProfileInnerPage}>
                            <FindFriendsBuilder />
                        </div>
                    </div>
                </main>
            </Fragment>
        );
    }
}
export default HomeLayout;

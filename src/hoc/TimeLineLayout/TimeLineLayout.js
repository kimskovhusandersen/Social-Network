import React, { Component, Fragment } from "react";

import NewPost from "../../containers/Blog/NewPost/NewPost";

import classes from "./TimeLineLayout.module.css";

class TimelineLayout extends Component {
    render() {
        return (
            <Fragment>
                <main className={classes.MainContainer}>
                    <div className={classes.SideNavigation}>
                        Side Navigation
                    </div>
                    <div className={classes.Stream}>
                        <NewPost />
                    </div>
                    <div className={classes.RightColumn}>Right Columns</div>
                </main>
            </Fragment>
        );
    }
}
export default TimelineLayout;

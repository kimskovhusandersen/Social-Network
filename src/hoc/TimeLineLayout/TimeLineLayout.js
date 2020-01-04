import React, { Component, Fragment } from "react";

class TimelineLayout extends Component {
    render() {
        return (
            <Fragment>
                <main>
                    <h1>Timeline Layout</h1>
                    <h1>Timeline Layout</h1>
                    <h1>Timeline Layout</h1>
                    <h1>Timeline Layout</h1>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}
export default TimelineLayout;

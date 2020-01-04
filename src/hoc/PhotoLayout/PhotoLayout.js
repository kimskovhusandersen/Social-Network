import React, { Component, Fragment } from "react";

class PhotoLayout extends Component {
    render() {
        return (
            <Fragment>
                <main>
                    <h1>PhotoLayout Layout</h1>
                    <h1>PhotoLayout Layout</h1>
                    <h1>PhotoLayout Layout</h1>
                    <h1>PhotoLayout Layout</h1>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}
export default PhotoLayout;

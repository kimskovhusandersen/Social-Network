import React, { Component, Fragment } from "react";

class AuthLayout extends Component {
    render() {
        return (
            <Fragment>
                <main>
                    <h1>AuthLayout Layout</h1>
                    <h1>AuthLayout Layout</h1>
                    <h1>AuthLayout Layout</h1>
                    <h1>AuthLayout Layout</h1>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}
export default AuthLayout;

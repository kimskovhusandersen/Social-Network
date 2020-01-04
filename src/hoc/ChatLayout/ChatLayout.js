import React, { Component, Fragment } from "react";
import ChatBuilder from "../../containers/ChatBuilder/ChatBuilder";

class ChatLayout extends Component {
    render() {
        let chat = null;
        let profilesOnline = null;

        if (this.props.profile) {
            chat = <ChatBuilder profileId={this.props.profile.id} />;
        }
        return (
            <Fragment>
                <main>
                    <h1>Chat Layout</h1>
                    {chat}
                </main>
            </Fragment>
        );
    }
}
export default ChatLayout;

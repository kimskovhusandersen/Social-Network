import React from "react";

import { StyledChat, ThreadsHeader, MessagesHeader } from "../style/chat";

const ChatPage = ({
    addThread,
    isThreadFormVisible,
    messages,
    threads,
    toggleThreadForm
}) => {
    console.log("IN CHAT PAGE", isThreadFormVisible);
    return (
        <StyledChat>
            <ThreadsHeader>
                <span>Chats</span>
                <a onClick={toggleThreadForm}>
                    <span>New Message</span>
                </a>
            </ThreadsHeader>
            {threads}
            <MessagesHeader>
                {!isThreadFormVisible && (
                    <div>
                        <img src="https://picsum.photos/50/50" />
                        <span>participant</span>
                    </div>
                )}
                {!!isThreadFormVisible && (
                    <div>
                        <a onClick={e => addThread(e, "hi")}>
                            <span>New Message</span>
                        </a>
                    </div>
                )}
            </MessagesHeader>
            {messages}
        </StyledChat>
    );
};

export default ChatPage;

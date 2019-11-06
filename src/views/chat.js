import React from "react";

import ChatThreadItem from "./chat-thread-item";
import {
    StyledChat,
    ThreadsHeader,
    ThreadsWrapper,
    MessagesHeader,
    MessagesWrapper
} from "../style/chat";

const Chat = ({ threads, threadId, selectThread, messages, newThread }) => {
    return (
        <StyledChat>
            <ThreadsHeader>
                <span>Chats</span>
                <a onClick={newThread}>
                    <span>New Message</span>
                </a>
            </ThreadsHeader>
            <ThreadsWrapper>
                {!!threads &&
                    threads.map(thread => (
                        <a
                            onClick={e => selectThread(e, threadId)}
                            key={thread.id}
                        >
                            <ChatThreadItem thread={thread}></ChatThreadItem>
                        </a>
                    ))}
            </ThreadsWrapper>
            <MessagesHeader>
                <div>
                    <img src="https://picsum.photos/50/50" />
                    <span>participant</span>
                </div>
            </MessagesHeader>
            <MessagesWrapper>{messages}</MessagesWrapper>
        </StyledChat>
    );
};

export default Chat;

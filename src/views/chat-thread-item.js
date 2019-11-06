import React from "react";
import RelativeTime from "./relative-time";
import { StyledChatThreadItem } from "../style/chat";
const ChatThreadItem = ({ thread }) => {
    return (
        <StyledChatThreadItem>
            <img src="https://picsum.photos/50/50" />
            <div>
                <span>{thread.title}</span>
                <span>
                    <RelativeTime timestamp={thread.createdAt} />
                </span>
            </div>
        </StyledChatThreadItem>
    );
};
export default ChatThreadItem;

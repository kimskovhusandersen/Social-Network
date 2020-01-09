import React from "react";
import RelativeTime from "./UI/RelativeTime/RelativeTime";
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

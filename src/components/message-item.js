import React from "react";
import RelativeTime from "./relative-time";
import { StyledMessageItem } from "../style/messages";

const MessageItem = ({ message, senderId, profileId }) => {
    if (!message) {
        return null;
    }
    return (
        <StyledMessageItem senderId={senderId} profileId={profileId}>
            <span>
                {message.firstName}&nbsp;
                {message.lastName}
            </span>
            <span>{message.content}</span>
            <span>
                <RelativeTime timestamp={message.createdAt} />
            </span>
        </StyledMessageItem>
    );
};
export default MessageItem;

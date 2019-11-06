import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { getMessages } from "./actions";

// Views
import MessageItem from "./views/message-item";
// Style
import { MessagesWrapper, StyledTextArea } from "./style/messages";

const Messages = ({ threadId, profileId }) => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state && state.messages);
    const chatWrapper = useRef();
    const keyCheck = e => {
        e.preventDefault();
        if (e.key == "Enter") {
            socket.emit("addMessage", e.target.value, 1);
            e.target.value = "";
        }
    };

    useEffect(() => {
        dispatch(getMessages(threadId));
        console.log("runing");
    }, [threadId]);

    useEffect(() => {
        if (messages) {
            let { clientHeight, scrollHeight } = chatWrapper.current;
            chatWrapper.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [messages]);

    if (!messages) {
        return null;
    }

    return (
        <React.Fragment>
            <MessagesWrapper ref={chatWrapper}>
                {!!messages &&
                    messages.map(message => (
                        <MessageItem
                            key={message.id}
                            message={message}
                            senderId={message.senderId}
                            profileId={profileId}
                        />
                    ))}
            </MessagesWrapper>
            <StyledTextArea
                placeholder="Type a message..."
                onKeyUp={e => keyCheck(e)}
            ></StyledTextArea>
        </React.Fragment>
    );
};

export default Messages;

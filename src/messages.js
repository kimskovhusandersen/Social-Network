import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";

import { getMessages } from "./actions";
import RelativeTime from "./views/relative-time";
import {
    FindFriendsItemWrapper,
    StyledFindFriendItem
} from "./style/find-friends-item";
import { ChatWrapper, StyledTextArea } from "./style/chat";

const Messages = () => {
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
        dispatch(getMessages());
    }, []);

    // useEffect(() => {
    //     let { clientHeight, scrollHeight } = chatWrapper.current;
    //     chatWrapper.current.scrollTop = scrollHeight - clientHeight;
    // }, [messages]);

    return (
        <React.Fragment>
            <FindFriendsItemWrapper first>
                <div>
                    <h1>I am the chat component</h1>
                    <StyledTextArea
                        placeholder="Type something.."
                        onKeyUp={e => keyCheck(e)}
                    ></StyledTextArea>
                    <ChatWrapper ref={chatWrapper}>
                        {!!messages &&
                            messages.map(message => (
                                <div key={message.id}>
                                    <span>
                                        {message.firstName}&nbsp;
                                        {message.lastName}&nbsp;
                                        {message.content}
                                    </span>
                                    <span>
                                        <RelativeTime
                                            timestamp={message.createdAt}
                                        />
                                        :&nbsp;
                                    </span>
                                </div>
                            ))}
                    </ChatWrapper>
                </div>
            </FindFriendsItemWrapper>
        </React.Fragment>
    );
};

export default Messages;

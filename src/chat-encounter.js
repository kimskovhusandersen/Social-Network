import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

import {
    FindFriendsItemWrapper,
    StyledFindFriendItem
} from "./style/find-friends-item";
import { ChatWrapper, StyledTextArea } from "./style/chat";

const Chat = () => {
    const messages = useSelector(state => state && state.messages);
    const chatWrapper = useRef();
    const keyCheck = e => {
        e.preventDefault();
        if (e.key == "Enter") {
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };
    useEffect(() => {
        let { clientHeight, scrollHeight } = chatWrapper.current;
        chatWrapper.current.scrollTop = scrollHeight - clientHeight;
    }, []);

    return (
        <React.Fragment>
            <FindFriendsItemWrapper first>
                <div>
                    <h1>I am the chat component</h1>
                    <ChatWrapper ref={chatWrapper}>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                        <p>chat messages will go here ... </p>
                    </ChatWrapper>
                    <StyledTextArea
                        placeholder="Type something.."
                        onKeyUp={e => keyCheck(e)}
                    ></StyledTextArea>
                </div>
            </FindFriendsItemWrapper>
        </React.Fragment>
    );
};

export default Chat;

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { getThreads, setSelectedThread } from "./actions";
import Messages from "./messages";

import ChatPage from "./views/chat-page";
import ChatThreadItem from "./views/chat-thread-item";
import { ThreadsWrapper, MessagesWrapper } from "./style/chat";

const Chat = ({ profileId, profilesOnline }) => {
    const dispatch = useDispatch();
    const threads = useSelector(state => state && state.threads);

    const selectedThread = useSelector(state => state && state.selectedThread);
    const [isThreadFormVisible, toggle] = useState(true);
    const selectThread = async (e, threadId) => {
        dispatch(setSelectedThread(threadId));
    };

    const addThread = async (e, values) => {
        console.log("ADDING NEW THREAD IN CHAT", values);
        socket.emit("addThread", values);
    };

    const toggleThreadForm = async () => {
        toggle(!isThreadFormVisible);
    };

    useEffect(() => {
        dispatch(getThreads());
    }, []);

    useEffect(() => {
        console.log(selectedThread);
    }, [selectedThread]);

    if (!threads) {
        return null;
    }
    console.log("IN CHAT", threads);

    return (
        <React.Fragment>
            <ChatPage
                addThread={(e, values) => addThread(e, values)}
                messages={
                    <MessagesWrapper>
                        <Messages profileId={profileId} />
                    </MessagesWrapper>
                }
                isThreadFormVisible={isThreadFormVisible}
                threads={
                    <ThreadsWrapper>
                        {!!threads &&
                            threads.map(thread => (
                                <a
                                    onClick={e => selectThread(e, thread.id)}
                                    key={thread.id}
                                >
                                    <ChatThreadItem
                                        thread={thread}
                                    ></ChatThreadItem>
                                </a>
                            ))}
                    </ThreadsWrapper>
                }
                toggleThreadForm={() => toggleThreadForm()}
            />
        </React.Fragment>
    );
};

export default Chat;

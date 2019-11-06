import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { getThreads, getMessages } from "./actions";
import Messages from "./messages";

import Chat from "./views/chat";

const Threads = ({ profileId, profilesOnline }) => {
    const dispatch = useDispatch();
    const threads = useSelector(state => state && state.threads);
    const [selectedThreadId, setSelectedThreadId] = useState(1);

    const selectThread = (e, threadId) => {
        setSelectedThreadId(threadId);
        console.log("SELECTING THRED ID", threadId);
    };

    const newThread = threadId => {
        console.log("NEW THREAD", threadId);
    };

    useEffect(() => {
        dispatch(getThreads());
    }, []);

    if (!threads) {
        return null;
    }
    return (
        <React.Fragment>
            <Chat
                profileId={profileId}
                threadId={selectedThreadId}
                threads={threads}
                selectThread={(e, id) => selectThread(e, id)}
                newThread={() => newThread()}
                messages={
                    <Messages
                        threadId={selectedThreadId}
                        profileId={profileId}
                    />
                }
            />
        </React.Fragment>
    );
};

export default Threads;

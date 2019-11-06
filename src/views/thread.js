import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { getThread } from "./actions";
import RelativeTime from "./views/relative-time";
import { ChatWrapper, StyledTextArea } from "./style/chat";

const Thread = () => {
    const dispatch = useDispatch();
    const thread = useSelector(state => state && state.thread);

    useEffect(() => {
        dispatch(getThread());
    }, []);

    return (
        <React.Fragment>
            <div>
                <p>{thread}</p>
            </div>
        </React.Fragment>
    );
};

export default Thread;

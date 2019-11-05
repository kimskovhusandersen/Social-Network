import * as io from "socket.io-client";
import { addMessage } from "./actions";
import { kebabObjToCamel } from "./helpers";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        // socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));
        //
        // socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

        socket.on("addMessage", msgObj => {
            let obj = kebabObjToCamel(msgObj);
            console.log("IN SOCKET", obj);

            store.dispatch(addMessage(obj));
        });
    }
};

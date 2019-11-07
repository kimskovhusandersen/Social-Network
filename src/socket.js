import * as io from "socket.io-client";
import { addMessage, addProfilesOnline, addThread } from "./actions";
import { kebabObjToCamel } from "./helpers";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("addMessage", messageObject => {
            let formattedObj = kebabObjToCamel(messageObject);
            store.dispatch(addMessage(formattedObj));
        });

        socket.on("addProfilesOnline", profileIds => {
            store.dispatch(addProfilesOnline(profileIds));
        });

        socket.on("addThread", thread => {
            store.dispatch(addThread(thread));
        });
    }
};

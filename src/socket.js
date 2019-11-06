import * as io from "socket.io-client";
import { addMessage, addProfilesOnline } from "./actions";
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
    }
};

import { connect } from "react-redux";
import * as io from "socket.io-client";
import * as actions from "./store/actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("friends", data => {
            switch (data.action) {
                case "addFriendRequest":
                    store.dispatch(actions.addFriendRequest(data.payload));
                case "acceptFriendRequest":
                    store.dispatch(actions.acceptFriendRequest(data.payload));
                case "deleteFriendRequest":
                    store.dispatch(actions.deleteFriendRequest(data.payload));
            }
        });
        socket.on("posts", data => {
            switch (data.action) {
                case "addPost":
                    store.dispatch(
                        actions.addPostSuccess(data.payload.id, data.payload)
                    );
            }
        });
        socket.on("photos", data => {
            switch (data.action) {
                case "addPhoto":
                    console.log("[socket.js] addPhoto", data.payload);
                    store.dispatch(
                        actions.addPhotoSuccess(data.payload.id, data.payload)
                    );
            }
        });
    }
};

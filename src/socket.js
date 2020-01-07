import * as io from "socket.io-client";

import * as actions from "./store/actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("makeFriendRequest", friend => {
            this.props.makeFriendRequest();
        });
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMakeFriendRequest: () => dispatch(actions.makeFriendRequest()),
        onAddFriend: () => dispatch(actions.addFriend())
    };
};

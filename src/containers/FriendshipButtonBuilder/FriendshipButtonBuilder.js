import React, { Component } from "react";
import { connect } from "react-redux";
import { useFetchData } from "../../helpers";

import * as actions from "../../store/actions";

import FriendshipButton from "../../components/FriendshipButton/FriendshipButton.js";

import {
    makeFriendRequest,
    acceptFriendRequest,
    deleteFriend
} from "../../actions";

class FriendshipButtonBuilder extends Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            accepted: null,
            friendshipRequested: null,
            receiverId: null,
            senderId: null,
            btnTxt: "Add Friend"
        };
        this.state = this.defaultState;
    }

    async handleClick() {
        let data;
        // deleteFriend
        if (this.state.accepted == true) {
            data = await useFetchData(`/api/friends/delete`, {
                receiverId: this.props.otherProfileId
            });
            this.props.onDeleteFriend(this.props.otherProfileId);
        }
        // makeFriendRequest
        else if (this.state.accepted === null) {
            data = await useFetchData(`/api/friends`, {
                receiverId: this.props.otherProfileId
            });
        }
        //acceptFriendRequest
        else if (
            this.state.accepted == false &&
            this.props.otherProfileId == this.state.senderId
        ) {
            data = await useFetchData(`/api/friends/accept`, {
                senderId: this.props.otherProfileId
            });
            this.props.onAddFriend(this.props.otherProfileId);
        }
        // delete  friend request
        else if (
            this.state.accepted == false &&
            this.props.otherProfileId == this.state.receiverId
        ) {
            data = await useFetchData(`/api/friends/delete`, {
                receiverId: this.props.otherProfileId
            });
        }

        // Update frindship status and button text
        if (data) {
            this.setState({
                accepted: data.accepted,
                receiverId: data.receiverId,
                senderId: data.senderId,
                btnTxt: this.getBtnTxt(data, this.props.otherProfileId)
            });
        }
    }

    getBtnTxt({ accepted, senderId, receiverId }, otherProfileId) {
        let text;
        if (accepted == true) {
            text = "Unfriend";
        } else if (accepted == null) {
            text = "Add friend";
        } else if (accepted == false && otherProfileId == senderId) {
            text = "Accept request";
        } else if (accepted == false && otherProfileId == receiverId) {
            text = "Cancel request";
        }
        return text;
    }

    async componentDidMount() {
        let data = await useFetchData(
            `/api/friends/${this.props.otherProfileId}`
        );

        if (data) {
            this.setState({
                accepted: data.accepted,
                receiverId: data.receiverId,
                senderId: data.senderId,
                btnTxt: this.getBtnTxt(data, this.props.otherProfileId)
            });
        }
    }

    render() {
        return (
            <FriendshipButton
                clicked={() => this.handleClick()}
                text={this.state.btnTxt}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddFriend: () => dispatch(actions.addFriend()),
        onDeleteFriend: () => dispatch(actions.deleteFriend())
    };
};
export default connect(
    null,
    mapDispatchToProps
)(FriendshipButtonBuilder);

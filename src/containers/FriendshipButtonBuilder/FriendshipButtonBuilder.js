import React, { Component } from "react";
import { connect } from "react-redux";
import { useFetchData } from "../../helpers";
import * as actions from "../../store/actions";
import { socket } from "../../socket";

import FriendshipButton from "../../components/FriendshipButton/FriendshipButton.js";

class FriendshipButtonBuilder extends Component {
    async handleClick() {
        let data;
        // unfriend
        if (this.props.profile.accepted == true) {
            this.props.onDeleteFriend(this.props.profile.id);
        }
        // make friend request
        else if (this.props.profile.accepted === null) {
            this.props.onAddFriend(this.props.profile.id);
        }
        //accept friend request
        else if (
            this.props.profile.accepted == false &&
            this.props.profile.id == this.props.profile.sender_id
        ) {
            this.props.onAcceptFriend(this.props.profile.id);
        }
        // cancel friend request
        else if (
            this.props.profile.accepted == false &&
            this.props.profile.id == this.props.profile.receiver_id
        ) {
            this.props.onDeleteFriend(this.props.profile.id);
        }
    }

    getBtnTxt(profile) {
        let text;
        if (profile.accepted == true) {
            text = "Unfriend";
        } else if (profile.accepted == null) {
            text = "Add friend";
        } else if (
            profile.accepted == false &&
            profile.id == profile.sender_id
        ) {
            text = "Accept request";
        } else if (
            profile.accepted == false &&
            profile.id == profile.receiver_id
        ) {
            text = "Cancel request";
        }
        return text;
    }

    render() {
        let friendshipButton = null;
        let btnTxt = null;
        if (this.props.profile) {
            btnTxt = this.getBtnTxt(this.props.profile);
        }
        if (btnTxt) {
            friendshipButton = (
                <FriendshipButton
                    clicked={() => this.handleClick()}
                    text={btnTxt}
                />
            );
        }
        return friendshipButton;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddFriend: profileId => dispatch(actions.addFriend(profileId)),
        onAcceptFriend: profileId => dispatch(actions.acceptFriend(profileId)),
        onDeleteFriend: profileId => dispatch(actions.deleteFriend(profileId))
    };
};
export default connect(
    null,
    mapDispatchToProps
)(FriendshipButtonBuilder);

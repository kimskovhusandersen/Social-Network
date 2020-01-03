import React, { useState, useEffect } from "react";
import { useFetchData } from "./helpers";
import { useDispatch } from "react-redux";
import {
    makeFriendRequest,
    acceptFriendRequest,
    deleteFriend
} from "./actions";

export const getBtnTxt = (
    { accepted, senderId, receiverId },
    otherProfileId
) => {
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
};

const FriendshipButton = ({ otherProfileId }) => {
    const dispatch = useDispatch();
    const [accepted, setAccepted] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [btnTxt, setBtnTxt] = useState("Add friend");

    const handleClick = async () => {
        let data;
        // deleteFriend
        if (accepted == true) {
            dispatch(deleteFriend(otherProfileId));
            data = await useFetchData(`/api/friends/delete`, {
                receiverId: otherProfileId
            });
        }
        // makeFriendRequest
        else if (accepted === null) {
            data = await useFetchData(`/api/friends/add`, {
                receiverId: otherProfileId
            });
            dispatch(makeFriendRequest(data));
        }
        //acceptFriendRequest
        else if (accepted == false && otherProfileId == senderId) {
            data = await useFetchData(`/api/friends/accept`, {
                senderId: otherProfileId
            });
            dispatch(acceptFriendRequest(otherProfileId));
        }
        // delete  friend request
        else if (accepted == false && otherProfileId == receiverId) {
            dispatch(deleteFriend(otherProfileId));
            data = await useFetchData(`/api/friends/delete`, {
                receiverId: otherProfileId
            });
        }

        // Update frindship status and button text
        if (data) {
            (async () => {
                await setBtnTxt(getBtnTxt(data, otherProfileId));
                await setAccepted(data.accepted);
                await setSenderId(data.senderId);
                await setReceiverId(data.receiverId);
            })();
        }
    };

    useEffect(() => {
        (async () => {
            // Get initial friendship status
            let data = await useFetchData(`/api/friends/${otherProfileId}`);
            if (data) {
                setBtnTxt(getBtnTxt(data, otherProfileId));
                setReceiverId(data.receiverId);
                setSenderId(data.senderId);
                setAccepted(data.accepted);
            }
        })();
    }, []);

    if (!otherProfileId) {
        return null;
    }
    return (
        <React.Fragment>
            <a onClick={handleClick}>{btnTxt}</a>
        </React.Fragment>
    );
};

export default FriendshipButton;

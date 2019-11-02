import React, { useState, useEffect } from "react";
import { Button } from "./style/theme";
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
    if (accepted == true) {
        return "End friendship";
    } else if (accepted == null) {
        return "Make friend request";
    } else if (accepted == false && otherProfileId == senderId) {
        return "Accept friendship";
    } else if (accepted == false && otherProfileId == receiverId) {
        return "Cancel friend request";
    }
};

const FriendshipButton = props => {
    const dispatch = useDispatch();
    const [accepted, setAccepted] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [btnTxt, setBtnTxt] = useState("Make friend request");

    const handleClick = async () => {
        const { otherProfileId } = props;
        // makeFriendRequest
        accepted === null && dispatch(makeFriendRequest(otherProfileId));

        // deleteFriend
        accepted == false &&
            otherProfileId == receiverId &&
            dispatch(deleteFriend(otherProfileId));
        accepted == true && dispatch(deleteFriend(otherProfileId));

        //acceptFriendRequest
        accepted == false &&
            otherProfileId == senderId &&
            dispatch(acceptFriendRequest(otherProfileId));

        // Get new frindship status
        const data = await useFetchData(`/api/friends/${otherProfileId}`);
        // Update frindship status and button text
        setBtnTxt(getBtnTxt(data, otherProfileId));
        setAccepted(data.accepted);
    };

    useEffect(() => {
        (async () => {
            const { otherProfileId } = props;
            // Get initial friendship status
            const data = await useFetchData(`/api/friends/${otherProfileId}`);
            if (data) {
                setBtnTxt(getBtnTxt(data, otherProfileId));
                setReceiverId(data.receiverId);
                setSenderId(data.senderId);
                setAccepted(data.accepted);
            }
        })();
    }, []);

    return (
        <React.Fragment>
            <Button onClick={handleClick}>{btnTxt}</Button>
        </React.Fragment>
    );
};

export default FriendshipButton;

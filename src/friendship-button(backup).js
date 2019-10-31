import React, { useState, useEffect } from "react";
import { Button } from "./theme";
import axios from "./axios_csurf";
const FriendshipButton = props => {
    const [accepted, setAccepted] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [btnTxt, setBtnTxt] = useState("Make friend request");

    const handleClick = async () => {
        const { otherProfileId } = props;
        if (
            accepted == true ||
            (accepted == false && otherProfileId == receiverId)
        ) {
            const { data } = await axios.post(
                `/api/friends/${otherProfileId}/delete`
            );
            if (data[0]) {
                setAccepted(null);
            }
        } else if (accepted == null) {
            const { data } = await axios.post(
                `/api/friends/${otherProfileId}/add`
            );
            if (data[0]) {
                setAccepted(false);
            }
        } else if (accepted == false && otherProfileId == senderId) {
            const { data } = await axios.post(
                `/api/friends/${otherProfileId}/accept`
            );
            if (data[0]) {
                setAccepted(true);
            }
        }
    };

    useEffect(() => {
        const { otherProfileId } = props;
        (async () => {
            const { data } = await axios.get(`/api/friends/${otherProfileId}`);
            if (data[0] && data[0].accepted) {
                const { accepted, receiver_id, sender_id } = data[0];
                if (senderId != sender_id) {
                    await setSenderId(sender_id);
                    await setReceiverId(receiver_id);
                    await setAccepted(accepted);
                }
            }
        })();
        return () => {
            let bt = getBtnTxt(accepted, otherProfileId, senderId, receiverId);
            setBtnTxt(bt);
        };
    }, [accepted]);

    return (
        <React.Fragment>
            <Button onClick={handleClick}>{btnTxt}</Button>
        </React.Fragment>
    );
};

export default FriendshipButton;

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

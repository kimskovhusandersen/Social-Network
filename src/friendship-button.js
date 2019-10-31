import React, { useState, useEffect } from "react";
import { Button } from "./theme";
import { useFetchData } from "./helpers";

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
    const [accepted, setAccepted] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [btnTxt, setBtnTxt] = useState("Make friend request");

    const handleClick = async () => {
        const { otherProfileId } = props;
        let url, values;
        if (accepted === null) {
            url = `/api/friends/add`;
            values = {
                receiverId: otherProfileId
            };
        } else if (
            (accepted == false && otherProfileId == receiverId) ||
            accepted == true
        ) {
            url = `/api/friends/delete`;
            values = {
                receiverId: otherProfileId
            };
        } else if (accepted == false && otherProfileId == senderId) {
            url = `/api/friends/accept`;
            values = {
                senderId: otherProfileId
            };
        }

        const data = await useFetchData(url, values);
        setBtnTxt(getBtnTxt(data, props.otherProfileId));
        setReceiverId(data.receiverId);
        setSenderId(data.senderId);
        setAccepted(data.accepted);
    };

    useEffect(() => {
        (async () => {
            let url = `/api/friends/${props.otherProfileId}`;
            const data = await useFetchData(url);
            if (data) {
                setBtnTxt(getBtnTxt(data, props.otherProfileId));
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

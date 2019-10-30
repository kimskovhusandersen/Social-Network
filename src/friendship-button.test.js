import React, { useState } from "react";
import { getBtnTxt } from "./friendship-button";
import { render, fireEvent, waitForElement } from "@testing-library/react";

test(`When accepted is null, setStateAccepted returns "Make Friend Request"`, () => {
    let accepted = null;
    let otherProfileId = 3;
    let senderId = 4;
    let receiverId = 5;

    const MockGetBtnTxt = getBtnTxt(
        accepted,
        otherProfileId,
        senderId,
        receiverId
    );

    expect(MockGetBtnTxt).toBe("Make friend request");
});

test(`When accepted is false and otherProfileId is equal to the receiverId, setStateAccepted returns "Cancel friendship"`, () => {
    let accepted = false;
    let otherProfileId = 3;
    let senderId = 5;
    let receiverId = 3;

    const MockGetBtnTxt = getBtnTxt(
        accepted,
        otherProfileId,
        senderId,
        receiverId
    );

    expect(MockGetBtnTxt).toBe("Cancel friendship");
});

test(`When accepted is false and otherProfileId is equal to senderId, setStateAccepted returns "Accept friendship"`, () => {
    let accepted = false;
    let otherProfileId = 3;
    let senderId = 3;
    let receiverId = 5;

    const MockGetBtnTxt = getBtnTxt(
        accepted,
        otherProfileId,
        senderId,
        receiverId
    );

    expect(MockGetBtnTxt).toBe("Accept friendship");
});

test(`When accepted is true, setStateAccepted returns "End Friendship"`, () => {
    let accepted = true;
    let otherProfileId = 3;
    let senderId = 3;
    let receiverId = 5;

    const MockGetBtnTxt = getBtnTxt(
        accepted,
        otherProfileId,
        senderId,
        receiverId
    );

    expect(MockGetBtnTxt).toBe("End friendship");
});

import React, { useState } from "react";
import ReactDOM from "react-dom";
import FriendshipButton, {
    getBtnTxt,
    fetchGetFriendData
} from "./friendship-button";
import { render, fireEvent, waitForElement, act } from "@testing-library/react";
import axios from "./axios_csurf";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

// automatic mock
jest.mock("./axios_csurf");

test("When accepted if false, axios returns an empty array", async () => {
    // Mock the data that the server sends back as response
    axios.get.mockResolvedValue({
        data: []
    });

    let otherProfileId = 3;

    return fetchGetFriendData(otherProfileId).then(({ data }) => {
        expect(data).toEqual([]);
    });
});

test(`When users aren't befriended, a "Add friend" button is rendered`, () => {
    const { container } = render(<FriendshipButton otherProfileId="3" />);

    expect(container.getElementsByTagName("button")[0].innerHTML).toBe(
        "Add friend"
    );
});

test(`When clicking the "Make friend request" button, a "Cancel request" button is rendered instead`, () => {
    act(() => {
        ReactDOM.render(<FriendshipButton otherProfileId="405" />, container);
    });
    axios.post.mockResolvedValue({
        data: [
            {
                accepted: false,
                receiver_id: 405
            }
        ]
    });

    let otherProfileId = 405;
    const url = "/api/friends/add";
    const values = { receiverId: otherProfileId };

    const button = container.querySelector("button");
    expect(button.textContent).toBe("Add friend");

    // Click "Make friend request" button
    act(async () => {
        await fireEvent.click(container.getElementsByTagName("button")[0]);
        await waitForElement(() => container.querySelector("button"));
        expect(button.textContent).toBe("Cancel request");
    });
});

// getBtnTxt():
test(`When accepted is null, getBtnTxt returns "Add friend"`, () => {
    let data = { accepted: null, senderId: 4, receiverId: 5 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("Add friend");
});

test(`When accepted is false and otherProfileId is equal to the receiverId, getBtnTxt returns "Unfriend"`, () => {
    let data = { accepted: false, senderId: 5, receiverId: 3 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("Unfriend");
});

test(`When accepted is false and otherProfileId is equal to senderId, getBtnTxt returns "Accept request"`, () => {
    let data = { accepted: false, senderId: 3, receiverId: 5 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("Accept request");
});

test(`When accepted is true, getBtnTxt returns "Unfriend"`, () => {
    let data = { accepted: true, senderId: 3, receiverId: 5 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("Unfriend");
});

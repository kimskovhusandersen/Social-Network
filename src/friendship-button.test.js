import React, { useState } from "react";
import ReactDOM from "react-dom";
import FriendshipButton, {
    getBtnTxt,
    fetchGetFriendData,
    fetchPostFriendData
} from "./friendship-button";
import {
    render,
    fireEvent,
    wait,
    waitForElement,
    waitForNextUpdate,
    act
} from "@testing-library/react";
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

test(`When users aren't befriended, a "Make friend request" button is rendered`, () => {
    const { container } = render(<FriendshipButton otherProfileId="3" />);

    expect(container.getElementsByTagName("button")[0].innerHTML).toBe(
        "Make friend request"
    );
});

test(`When clicking the "Make friend request" button, a "Cancel friend request" button is rendered instead`, () => {
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
    expect(button.textContent).toBe("Make friend request");

    // Click "Make friend request" button
    act(async () => {
        await fireEvent.click(container.getElementsByTagName("button")[0]);
        await waitForElement(() => container.querySelector("button"));
        expect(button.textContent).toBe("Cancel friend request");
    });
});

// getBtnTxt():
test(`When accepted is null, getBtnTxt returns "Make Friend Request"`, () => {
    let data = { accepted: null, senderId: 4, receiverId: 5 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("Make friend request");
});

test(`When accepted is false and otherProfileId is equal to the receiverId, getBtnTxt returns "Cancel friendship"`, () => {
    let data = { accepted: false, senderId: 5, receiverId: 3 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("Cancel friend request");
});

test(`When accepted is false and otherProfileId is equal to senderId, getBtnTxt returns "Accept friendship"`, () => {
    let data = { accepted: false, senderId: 3, receiverId: 5 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("Accept friendship");
});

test(`When accepted is true, getBtnTxt returns "End Friendship"`, () => {
    let data = { accepted: true, senderId: 3, receiverId: 5 };
    let otherProfileId = 3;

    expect(getBtnTxt(data, otherProfileId)).toBe("End friendship");
});

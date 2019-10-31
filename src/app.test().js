import React from "react";
import App from "./app";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import axios from "./axios_csurf";

// automatic mock
jest.mock("./axios");

test("App shows nothing at first", async () => {
    // Mock the data that the server sends back as response
    axios.get.mockResolvedValue({
        profile: [
            {
                id: 9999,
                first: "dummyValue",
                last: "dummyValue",
                url: "dummyValue"
            }
        ]
    });

    // Invoke App component
    const { container } = render(<App />);

    expect(container.children.length).toBe(0);

    // As axios is running asynchronously, we need to use waitForElement
    await waitForElement(() => container.querySelector("header"));

    expect(container.children.length).toBe(1);
});

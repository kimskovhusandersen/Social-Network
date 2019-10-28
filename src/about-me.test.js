import React from "react";
import AboutMe from "./about-me";
import { Text, Button } from "./theme";
import { render, fireEvent, waitForElement } from "@testing-library/react";

test(`When no aboutMe is passed to it, an "Add" button is rendered`, () => {
    const { container } = render(<AboutMe />);
    // console.log(container.getElementsByTagName("button"));
    expect(container.getElementsByTagName("button")[0].innerHTML).toBe("Add");
});

test(`When a aboutMe is passed to it, an "Edit" button is rendered`, () => {
    const { container } = render(<AboutMe aboutMe="DummyValue" />);
    // console.log(container.getElementsByTagName("button"));
    expect(container.getElementsByTagName("button")[0].innerHTML).toBe("Edit");
});

test("onClick prop gets called when img is clicked", async () => {});

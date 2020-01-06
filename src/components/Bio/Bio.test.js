import React from "react";
import Bio from "./Bio";
import { render, fireEvent, waitForElement } from "@testing-library/react";

test(`When no bio is passed to it, an "Add" button is rendered`, () => {
    const { container } = render(<AboutMe />);
    // console.log(container.getElementsByTagName("button"));
    expect(container.getElementsByTagName("button")[0].innerHTML).toBe("Add");
});

test(`When a bio is passed to it, an "Edit" button is rendered`, () => {
    const { container } = render(<AboutMe bio="DummyValue" />);
    // console.log(container.getElementsByTagName("button"));
    expect(container.getElementsByTagName("button")[0].innerHTML).toBe("Edit");
});

test("onClick prop gets called when img is clicked", async () => {});

import React from "react";
import ProfilePhoto from "../profile-photo";
import { render, fireEvent } from "@testing-library/react";

test("render img with src set to url prop", () => {
    const { container } = render(<ProfilePhoto url="/dog.png" />);

    expect(container.querySelector("img").getAttribute("src")).toBe("/dog.png");
});

test("render img with src set to /default.jpg when no url prop is passed", () => {
    const { container } = render(<ProfilePhoto />);

    expect(container.querySelector("img").getAttribute("src")).toBe(
        "/default-avatar.jpg"
    );
});

test("renders firstName and lastName props in alt attribute", () => {
    const { container } = render(
        <ProfilePhoto firstName="Kim" lastName="Andersen" />
    );

    expect(container.querySelector("img").getAttribute("alt")).toBe(
        "Kim Andersen"
    );
});

test("onClick prop gets called when img is clicked", () => {
    const onClick = jest.fn();
    const { container } = render(<ProfilePhoto onClick={onClick} />);

    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));

    expect(onClick.mock.calls.length).toBe(3);
});

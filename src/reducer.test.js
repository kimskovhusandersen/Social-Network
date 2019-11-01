const { reducer } = require("./reducer");

let state, action;

test("isButtonVisible equals true", () => {
    state = {
        isButtonVisible: false
    };

    action = {
        type: "UPDATE_IS_BUTTON_VISIBLE",
        paths: [],
        data: true
    };

    expect(reducer(state, action)).toEqual({ isButtonVisible: true });
});

test(`Property "lastName" equals "New last name"`, () => {
    state = {
        profile: {
            id: 1,
            firstName: "Kim",
            lastName: "Andersen"
        },
        isButtonVisible: false
    };

    action = {
        type: "UPDATE_LAST_NAME",
        paths: ["profile"],
        data: "New last name"
    };

    expect(reducer(state, action)).toHaveProperty(
        "profile.lastName",
        "New last name"
    );
});

test(`Property "lastName" equals "New last name" in profile, but property "lastName" in "otherProfile" still equals "Smith" `, () => {
    state = {
        profile: {
            id: 1,
            firstName: "Kim",
            lastName: "Andersen"
        },
        otherProfile: {
            id: 2,
            firstName: "John",
            lastName: "Smith"
        },
        isButtonVisible: false
    };

    action = {
        type: "UPDATE_LAST_NAME",
        paths: ["profile"],
        data: "New last name"
    };

    expect(reducer(state, action)).toHaveProperty(
        "profile.lastName",
        "New last name"
    );
    expect(reducer(state, action)).toHaveProperty(
        "otherProfile.lastName",
        "Smith"
    );
});
test(`Remove friend with id 1 from friends array`, () => {
    state = {
        friends: [{ id: 1 }, { id: 2 }, { id: 3 }]
    };
    const removeFriendID1 = val =>
        val.filter(friend => friend.id != 1 && friend);
    action = {
        type: "UPDATE_FRIENDS",
        data: removeFriendID1
    };
    expect(reducer(state, action).friends).toEqual(
        expect.arrayContaining([{ id: 2 }, { id: 3 }])
    );
});

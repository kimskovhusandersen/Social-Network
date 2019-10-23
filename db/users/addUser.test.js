const addUser = require("./addUser.js");

test("the data is peanut butter", () => {
    return addUser().then(result => {
        console.log(result);
        // expect(rows[0]).toBe("peanut butter");
    });
});

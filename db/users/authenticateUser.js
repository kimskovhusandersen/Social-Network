const { promisify } = require("util");
let { compare } = require("bcryptjs");
compare = promisify(compare);

const auth = (db, email, password) => {
    return db.getHash(email).then(result => {
        if (!result.rows[0]) {
            return Promise.reject(
                new Error("Incorrect email. Please try again.")
            );
        }
        const { hash } = result.rows[0];
        return compare(password, hash);
    });
};

module.exports = auth;

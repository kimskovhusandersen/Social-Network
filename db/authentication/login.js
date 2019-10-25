const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { DB_USERNAME, DB_PASSWORD } = require("../../secrets.json");
    db = spicedPg(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/socialnetwork`
    );
}

const getUser = require("../users/id/getUser");

const { promisify } = require("util");
let { compare } = require("bcryptjs");
compare = promisify(compare);

const login = async (req, { password, email }) => {
    // step 1 - get hashed password from db
    let { rows } = await db.query(
        `SELECT id, hashed_password FROM users WHERE email = $1;`,
        [email]
    );
    if (!rows[0]) {
        return Promise.reject({
            name: "error",
            constraint: "users_email_key"
        });
    }
    const { id, hashed_password: hashed } = rows[0];

    // step 2 - compare user input password with hashed password
    const match = await compare(password, hashed);
    if (!match) {
        return Promise.reject({
            name: "error",
            constraint: "users_password_key"
        });
    }
    // Step 3 - add userId to session (logged in!)
    req.session.userId = id;
};

module.exports = login;

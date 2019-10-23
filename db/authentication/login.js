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

const { promisify } = require("util");
let { compare } = require("bcryptjs");
compare = promisify(compare);

const login = req => {
    const { password, email } = req.body;
    // step 1 - get hash
    return db
        .query(`SELECT id, hashed_password FROM users WHERE email = $1;`, [
            email
        ])
        .then(({ rows }) => {
            if (!rows[0]) {
                return Promise.reject({
                    name: "error",
                    constraint: "users_email_key"
                });
            }
            const { hashed_password: hashed } = rows[0];
            // step 2 - compare password with hashed password
            return compare(password, hashed);
        })
        .then(match => {
            // Step 3 - check if they are matching
            if (!match) {
                return Promise.reject({
                    name: "error",
                    constraint: "users_password_key"
                });
            }
            // Step 4 - get user info
        });
};

module.exports = login;

const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const {
        DB_USERNAME,
        DB_PASSWORD
    } = require("/mnt/c/Users/kimsk/Documents/spice/coriander-socialnetwork/secrets.json");
    db = spicedPg(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/socialnetwork`
    );
}

const { promisify } = require("util");
let { compare } = require("bcryptjs");
compare = promisify(compare);

const login = async (req, { password, email }) => {
    // step 1 - get hashed password from db
    const { rows } = await db.query(
        `SELECT id, hashed_password FROM profiles WHERE email = $1;`,
        [email]
    );
    if (!rows[0]) {
        return Promise.reject({
            name: "error",
            constraint: "profiles_email_key"
        });
    }
    const { id, hashed_password: hashed } = rows[0];
    // step 2 - compare password with hashed password
    const match = await compare(password, hashed);
    if (!match) {
        return Promise.reject({
            name: "error",
            constraint: "profiles_password_key"
        });
    }
    // Step 3 - add userId to session (logged in!)
    req.session.profileId = id;
};

module.exports = login;

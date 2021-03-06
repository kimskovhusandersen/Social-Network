const spicedPg = require("spiced-pg");
let db;

var path = require("path");
var appDir = path.dirname(require.main.filename);

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { DB_USERNAME, DB_PASSWORD } = require(`${appDir}/secrets.json`);
    db = spicedPg(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/socialnetwork`
    );
}

const { promisify } = require("util");
let { genSalt, hash } = require("bcryptjs");
hash = promisify(hash);
genSalt = promisify(genSalt);

const hashPassword = password => genSalt().then(salt => hash(password, salt));

const addProfile = async ({ email, password, firstName, lastName }) => {
    const hashedPassword = await hashPassword(password);
    return db.query(
        `INSERT INTO profiles (email, hashed_password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id;`,
        [email, hashedPassword, firstName, lastName]
    );
};

module.exports = addProfile;

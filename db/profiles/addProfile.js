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
let { genSalt, hash } = require("bcryptjs");
hash = promisify(hash);
genSalt = promisify(genSalt);

const hashPassword = password => genSalt().then(salt => hash(password, salt));

const addProfile = async ({ email, password }) => {
    const hashedPassword = await hashPassword(password);
    return db.query(
        `INSERT INTO profiles (email, hashed_password) VALUES ($1, $2) RETURNING id;`,
        [email, hashedPassword]
    );
};

module.exports = addProfile;

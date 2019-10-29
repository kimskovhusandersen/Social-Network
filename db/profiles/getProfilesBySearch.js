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

const getProfilesBySearch = async query => {
    return db.query(
        `SELECT id, first_name, last_name FROM profiles WHERE first_name ILIKE $1;`,
        [`${query}%`]
    );
};

module.exports = getProfilesBySearch;

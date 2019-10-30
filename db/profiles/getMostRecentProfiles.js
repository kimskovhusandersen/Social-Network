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

const getMostRecentProfiles = () => {
    return db.query(
        `SELECT *,
            (SELECT id FROM profiles
            ORDER BY id ASC
            LIMIT 1)
            AS lowest_id
        FROM profiles
        ORDER BY id DESC
        LIMIT 3;`
    );
};
module.exports = getMostRecentProfiles;

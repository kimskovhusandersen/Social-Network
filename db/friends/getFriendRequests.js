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

const getFriendRequests = async profileId => {
    return db.query(
        `SELECT * FROM friends WHERE (receiver_id = $1 OR sender_id = $1) AND accepted = FALSE;`,
        [profileId]
    );
};

module.exports = getFriendRequests;

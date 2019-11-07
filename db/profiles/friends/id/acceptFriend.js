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

const acceptFriend = async ({ senderId, receiverId }) => {
    return db.query(
        `UPDATE friends SET accepted = TRUE WHERE sender_id = $1 AND receiver_id = $2 RETURNING *;`,
        [senderId, receiverId]
    );
};

module.exports = acceptFriend;

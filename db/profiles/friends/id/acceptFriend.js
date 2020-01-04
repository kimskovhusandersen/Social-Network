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

const acceptFriend = async ({ senderId, receiverId }) => {
    return db.query(
        `UPDATE friends SET accepted = TRUE WHERE sender_id = $1 AND receiver_id = $2 RETURNING *;`,
        [senderId, receiverId]
    );
};

module.exports = acceptFriend;

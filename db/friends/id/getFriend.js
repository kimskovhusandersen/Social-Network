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

// insert sender_id = req.session.profileId, receiver id = profileId, and accepted = false

const getFriend = async (senderId, receiverId) => {
    return db.query(
        `SELECT * FROM friends WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1);`,
        [senderId, receiverId]
    );
};

module.exports = getFriend;

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

// insert sender_id = req.session.profileId, receiver id = profileId, and accepted = false

const addFriend = async ({ senderId, receiverId }) => {
    return db.query(
        `INSERT INTO friends (sender_id, receiver_Id, accepted) VALUES ($1, $2, $3) RETURNING *;`,
        [senderId, receiverId, false]
    );
};

module.exports = addFriend;

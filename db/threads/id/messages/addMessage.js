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

const addMessage = async ({ content, senderId, threadId }) => {
    return db.query(
        `
        WITH insertedMessage AS(
            INSERT INTO messages
            (content, sender_id, thread_id)
            VALUES ($1, $2, $3)
            RETURNING *
        )
        SELECT insertedMessage.id, insertedMessage.content, insertedMessage.sender_id, insertedMessage.thread_id, insertedMessage.created_at,
        profiles.first_name, profiles.last_name,
            (SELECT messages.id
            FROM messages
            ORDER BY id ASC
            LIMIT 1)
            AS lowest_id
        FROM insertedMessage
        LEFT JOIN profiles
        ON insertedMessage.sender_id = profiles.id
        WHERE thread_id = insertedMessage.thread_id;`,
        [content, senderId, threadId]
    );
};

module.exports = addMessage;

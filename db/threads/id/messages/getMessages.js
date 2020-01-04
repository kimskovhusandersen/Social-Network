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

const getMessages = async threadId => {
    return db.query(
        `
        SELECT messages.id, messages.content, messages.sender_id, messages.thread_id, messages.created_at,
        profiles.first_name, profiles.last_name,
            (SELECT messages.id FROM messages
            ORDER BY id ASC
            LIMIT 1)
            AS lowest_id
        FROM messages
        LEFT JOIN profiles
        ON messages.sender_id = profiles.id
        WHERE thread_id = $1
        ORDER BY id ASC;
    `,
        [threadId]
    );
};

module.exports = getMessages;

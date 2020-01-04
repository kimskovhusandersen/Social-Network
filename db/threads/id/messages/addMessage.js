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

const addMessage = async ({ content, senderId, threadId }) => {
    console.log("content, senderId, threadId", content, senderId, threadId);
    console.log();
    return db.query(
        `
            INSERT INTO messages
            (content, sender_id, thread_id)
            VALUES ($1, $2, $3);
`,
        [content, senderId, threadId]
    );
};

module.exports = addMessage;

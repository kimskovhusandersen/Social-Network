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

const getThread = async threadId => {
    return await db.query(
        `
        SELECT *
        FROM threads
        LEFT JOIN messages
        ON (threads.id = messages.thread_id)
        LEFT JOIN participants
        ON (threads.id = participants.thread_id)
        WHERE threads.id = 1;
        `,
        [threadId]
    );
};

module.exports = getThread;

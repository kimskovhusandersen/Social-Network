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

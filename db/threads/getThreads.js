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

const getThreads = async profileId => {
    return db.query(
        `
        SELECT threads.id, threads.title, threads.owner_id, threads.created_at
        FROM threads
        LEFT JOIN participants
        ON threads.id = participants.thread_id
        WHERE participants.profile_id = $1
        ORDER BY threads.id DESC;
    `,
        [profileId]
    );
};

module.exports = getThreads;

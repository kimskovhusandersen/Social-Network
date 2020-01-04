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

const addParticipant = async ({
    threadId,
    profileId,
    title,
    isStillParticipant,
    threadType,
    threadPath
}) => {
    return db.query(
        `
        INSERT INTO participants (thread_id, profile_id, title, is_still_participant, thread_type, thread_path)
        VALUES ($1, $2, $3, $4, $5, $6);`,
        [threadId, profileId, title, isStillParticipant, threadType, threadPath]
    );
};

module.exports = addParticipant;

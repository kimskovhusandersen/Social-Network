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

const getParticipants = async threadId => {
    return db.query(
        `
        SELECT participants.thread_id, participants.profile_id, participants.title, participants.thread_type, participants.thread_path, participants.created_at,
        profiles.first_name, profiles.last_name
        FROM participants
        LEFT JOIN profiles
        ON participants.profile_id = profiles.id
        WHERE thread_id = 1
        AND participants.is_still_participant = TRUE
        ORDER BY participants.id ASC;
    `,
        [threadId]
    );
};

module.exports = getParticipants;

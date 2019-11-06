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

const getThreads = async profileId => {
    return db.query(
        `
        SELECT *
        FROM threads
        WHERE threads.owner_id = $1
        ORDER BY id DESC;
    `,
        [profileId]
    );
};

module.exports = getThreads;

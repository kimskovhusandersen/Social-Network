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

const getProfilesBySearch = async (query, profileId) => {
    console.log("ID", profileId);
    return db.query(
        `SELECT profiles.id, first_name, last_name,
            (SELECT id FROM profiles
            ORDER BY id ASC
            LIMIT 1)
            AS lowest_id,
            (SELECT photos.url
            FROM photos
            WHERE photos.profile_id = profiles.id
            AND photos.album = 'profile_photos'
            AND profiles.id <> $2
            ORDER BY photos.id ASC
            LIMIT 1)
            AS url
        FROM profiles
        WHERE first_name ILIKE $1 OR last_name ILIKE $1 AND profiles.id <> $2
        ORDER BY profiles.id DESC
        LIMIT 10;`,
        [`${query}%`, profileId]
    );
};

module.exports = getProfilesBySearch;

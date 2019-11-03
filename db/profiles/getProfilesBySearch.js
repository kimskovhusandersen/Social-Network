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

const getProfilesBySearch = async query => {
    return db.query(
        `SELECT profiles.id, first_name, last_name, photos.url,
            (SELECT id FROM profiles
            ORDER BY id ASC
            LIMIT 1)
            AS lowest_id
        FROM profiles
        LEFT JOIN photos
        ON (profiles.id = photos.profile_id)
        WHERE first_name ILIKE $1
        ORDER BY id DESC
        LIMIT 10;`,
        [`${query}%`]
    );
};

module.exports = getProfilesBySearch;

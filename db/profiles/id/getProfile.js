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

const getProfile = async id => {
    return await db.query(
        `
        SELECT profiles.id, first_name, last_name, about_me, photos.url
        FROM profiles
        LEFT JOIN photos
        ON (profiles.id = photos.profile_id)
        WHERE profiles.id = $1
        ORDER BY id DESC LIMIT 1;
        `,
        [id]
    );
};

module.exports = getProfile;

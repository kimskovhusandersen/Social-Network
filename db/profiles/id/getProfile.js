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

const getProfile = async id => {
    return db.query(
        `
        SELECT profiles.id, first_name, middle_name, last_name, about_me, profiles.created_at,
        (
            SELECT photos.url
            FROM photos
            WHERE photos.profile_id = profiles.id
            AND photos.album = 'profile_photos'
            ORDER BY photos.id DESC
            LIMIT 1
        )
        AS url
        FROM profiles
        WHERE profiles.id = $1;
        `,
        [id]
    );
};

module.exports = getProfile;

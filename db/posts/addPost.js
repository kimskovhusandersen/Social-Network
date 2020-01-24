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

const addPost = ({ body, profileId }) => {
    return db.query(
        `
        WITH inserted AS (
            INSERT INTO posts (body, profile_id) VALUES ($1, $2) RETURNING *
        )
        SELECT inserted.*, profiles.first_name, profiles.middle_name, profiles.last_name,
        (
            SELECT photos.url
            FROM photos
            WHERE photos.profile_id = inserted.profile_id
            AND photos.album = 'profile_photos'
            ORDER BY photos.id DESC
            LIMIT 1
        )
        AS url
        FROM inserted
        INNER JOIN profiles ON inserted.profile_id = profiles.id;
        `,
        [body, profileId]
    );
};

module.exports = addPost;

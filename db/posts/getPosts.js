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

const getPosts = profileId => {
    return db.query(
        `
        SELECT posts.id, posts.body, posts.profile_id,
            (SELECT id FROM posts
                ORDER BY id ASC
                LIMIT 1)
            AS lowest_id,
            (SELECT photos.url
                FROM photos
                WHERE photos.profile_id = posts.profile_id
                AND photos.album = 'profile_photos'
                ORDER BY photos.id DESC
            LIMIT 1) as url
        FROM posts
        JOIN profiles
        ON posts.profile_id = profiles.id
        WHERE posts.profile_id = $1
        ORDER BY posts.id DESC
        LIMIT 20;
        `,
        [profileId]
    );
};

module.exports = getPosts;

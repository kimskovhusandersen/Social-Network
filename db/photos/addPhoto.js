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

const addPhoto = ({ caption, url, album, profileId }) => {
    return db.query(
        `
        INSERT INTO photos (caption, url, album, profile_id) VALUES ($1, $2, $3, $4) RETURNING *;
        `,
        [caption, url, album, profileId]
    );
};

module.exports = addPhoto;

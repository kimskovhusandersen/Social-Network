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

const getPhotos = profileId => {
    return db.query(
        `
        SELECT *,
            (SELECT id FROM photos
                ORDER BY id ASC
                LIMIT 1)
            AS lowest_id
        FROM photos
        WHERE profile_id = $1
        ORDER BY id DESC
        LIMIT 20;
        `,
        [profileId]
    );
};

module.exports = getPhotos;

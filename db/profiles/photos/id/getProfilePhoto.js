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

const getProfilePhoto = profileId => {
    return db.query(
        `
        SELECT * FROM photos WHERE profile_id = $1 AND album = $2 ORDER BY id DESC LIMIT 1;
        `,
        [profileId, "profile_photos"]
    );
};

module.exports = getProfilePhoto;

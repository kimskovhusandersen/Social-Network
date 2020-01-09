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

const getFriends = async profileId => {
    return db.query(
        `
        SELECT profiles.id, profiles.first_name, profiles.last_name, friends.accepted, friends.receiver_id, friends.sender_id,
            (SELECT id FROM profiles
                ORDER BY id ASC
                LIMIT 1)
            AS lowest_id,
            (SELECT photos.url
                FROM photos
                WHERE photos.profile_id = profiles.id
                AND photos.album = 'profile_photos'
                AND profiles.id <> $1
                ORDER BY photos.id DESC
            LIMIT 1)
            AS url
        FROM friends
        JOIN profiles
        ON (accepted = false AND receiver_id = $1 AND sender_id = profiles.id);`,
        [profileId]
    );
};

module.exports = getFriends;

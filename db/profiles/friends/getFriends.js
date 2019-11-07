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

const getFriends = async profileId => {
    return db.query(
        `
        SELECT profiles.id, profiles.first_name, profiles.last_name, accepted, url
        FROM friends
        JOIN profiles
        LEFT JOIN photos
        ON (profiles.id = photos.profile_id)
        ON (accepted = false AND receiver_id = $1 AND sender_id = profiles.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = profiles.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = profiles.id)
    `,
        [profileId]
    );
};

module.exports = getFriends;

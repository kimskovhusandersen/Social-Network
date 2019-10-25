const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { DB_USERNAME, DB_PASSWORD } = require("../../secrets.json");
    db = spicedPg(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/socialnetwork`
    );
}

const upsertProfileImage = (userId, imageId) => {
    return db.query(
        `
        INSERT INTO user_profile_image (user_id, image_id) VALUES ($1, $2)
        ON CONFLICT (user_id) DO
        UPDATE SET user_id = $1, image_id = $2;
        `,
        [userId, imageId]
    );
};

module.exports = upsertProfileImage;

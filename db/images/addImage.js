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

const addImage = ({ caption, url, userId }) => {
    return db.query(
        `
        INSERT INTO images (caption, url, user_id) VALUES ($1, $2, $3) RETURNING *;
        `,
        [caption, url, userId]
    );
};

module.exports = addImage;

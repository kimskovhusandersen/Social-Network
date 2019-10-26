const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { DB_USERNAME, DB_PASSWORD } = require("../../../secrets.json");
    db = spicedPg(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/socialnetwork`
    );
}

const getUser = async id => {
    return await db.query(
        `
        SELECT firstname, lastname, email
        FROM users
        WHERE id = $1;
        `,
        [id]
    );
};

module.exports = getUser;

// user_profiles.birthday_day AS birthday_day,
// user_profiles.birthday_month AS birthday_month,
// user_profiles.birthday_year AS birthday_year,
// user_profiles.sex AS sex,
// images.image_url AS image_url
//
// JOIN user_profiles ON user_profiles.user_id = users.id
// JOIN images ON images.user_id = users.id

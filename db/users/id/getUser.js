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

const getUser = id => {
    return db.query(
        `SELECT users.id as user_id, users.firstname, users.lastname, users.email, user_profiles.birthday_day, user_profiles.birthday_month, user_profiles.birthday_year, user_profiles.sex FROM users
            LEFT JOIN user_profiles ON user_profiles.user_id = users.id
            LEFT JOIN images ON images.user_id = users.id
            LEFT JOIN user_profile_image ON user_profile_image.user_id = users.id
        WHERE users.id = $1;`,
        [id]
    );
};

module.exports = getUser;

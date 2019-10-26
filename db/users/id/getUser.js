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
        `
        SELECT users.firstname AS firstname, users.lastname AS lastname, users.email AS email,
        user_profiles.birthday_day AS birthday_day, user_profiles.birthday_month AS birthday_month,
        user_profiles.birthday_year AS birthday_year, user_profiles.sex AS sex,
        (SELECT images.image_url
        FROM images JOIN user_profile_image ON user_profile_image.user_id = images.user_id
        WHERE images.user_id = $1) AS profile_image_url
        FROM users
        INNER JOIN user_profiles ON users.id = user_profiles.user_id
        INNER JOIN images ON users.id = images.user_id
        WHERE users.id = $1;
        `,
        [id]
    );
};

module.exports = getUser;

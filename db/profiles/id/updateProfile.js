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

const model = {
    id: null,
    firstName: null,
    middle_name: null,
    last_name: null,
    birthday_day: null,
    birthday_month: null,
    birthday_year: null,
    gender: null,
    current_city: null,
    hometown: null,
    relationship_status: null,
    interested_in: null,
    about_me: null,
    favorite_quotes: null
};

const updateProfile = async data => {
    let values;
    await (function() {
        for (let [key, value] of Object.entries(data)) {
            if (model.hasOwnProperty(key)) {
                model[key] = value;
            }
        }
        return (values = Object.values(model));
    })();

    return db.query(
        `UPDATE profiles SET
            first_name = COALESCE($2, first_name),
            middle_name = COALESCE($3, middle_name),
            last_name = COALESCE($4, last_name),
            birthday_day = COALESCE($5, birthday_day),
            birthday_month = COALESCE($6, birthday_month),
            birthday_year = COALESCE($7, birthday_year),
            gender = COALESCE($8, gender),
            current_city = COALESCE($9,current_city),
            hometown = COALESCE($10,hometown),
            relationship_status = COALESCE($11,relationship_status),
            interested_in = COALESCE($12,interested_in),
            about_me = COALESCE($13,about_me),
            favorite_quotes = COALESCE($14, favorite_quotes)
        WHERE id = $1
        RETURNING *;`,
        values
    );
};

module.exports = updateProfile;

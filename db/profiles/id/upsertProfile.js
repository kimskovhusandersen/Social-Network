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

const upsertProfile = ({
    firstName,
    middleName,
    lastName,
    birthdayDay,
    birthdayMonth,
    birthdayYear,
    gender,
    currentCity,
    hometown,
    relationshipStatus,
    interestedIn,
    aboutMe,
    favoriteQuotes,
    profileId
}) => {
    return db.query(
        `INSERT INTO profiles (
            first_name,
            middle_name,
            last_name,
            birthday_day,
            birthday_month,
            birthday_year,
            gender,
            current_city,
            hometown,
            relationship_status,
            interested_in,
            about_me,
            favorite_quotes


        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            ON CONFLICT (profile_id) DO UPDATE SET
                first_name = COALESCE($1, first_name),
                middle_name = COALESCE($2, middle_name),
                last_name = COALESCE($3, last_name),
                birthday_day = COALESCE($4, birthday_day),
                birthday_month = COALESCE($5, birthday_month),
                birthday_year = COALESCE($6, birthday_year),
                gender = COALESCE($7, gender),
                current_city = COALESCE($8, current_city),
                hometown = COALESCE($9, hometown),
                relationship_status = COALESCE($10, relationship_status),
                interested_in = COALESCE($10, interested_in),
                about_me = COALESCE($11, about_me),
                favorite_quotes = COALESCE($12, favorite_quotes),
                profile_id = $5
        RETURNING *;`,
        [
            firstName,
            middleName,
            lastName,
            birthdayDay,
            birthdayMonth,
            birthdayYear,
            gender,
            currentCity,
            hometown,
            relationshipStatus,
            interestedIn,
            aboutMe,
            favoriteQuotes,
            profileId
        ]
    );
};

module.exports = upsertProfile;

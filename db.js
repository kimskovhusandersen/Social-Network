const spicedPg = require("spiced-pg");
const bcrypt = require("./bcrypt");
// ------------------------------------------------------------------------
// FOR HEROKU:
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { DB_USERNAME, DB_PASSWORD } = require("./secrets.json");
    db = spicedPg(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/socialnetwork`
    );
}
// ------------------------------------------------------------------------

// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------
// PETITION STUFF
// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------

exports.getHash = email => {
    return db.query(`SELECT password AS hash FROM users WHERE email = $1;`, [
        email
    ]);
};

const handlePassword = password => {
    return password == ""
        ? new Promise((resolve, reject) => {
            resolve(null);
        })
        : bcrypt.hash(password).then(hash => hash);
};

exports.addUserProfile = (
    birthday_day,
    birthday_month,
    birthday_year,
    sex,
    userId
) => {
    return db
        .query(
            `INSERT INTO user_profiles (birthday_day, birthday_month, birthday_year, sex, user_id) VALUES ($1, $2, $3, $4 $5)
        RETURNING *`,
            [birthday_day, birthday_month, birthday_year, sex, userId]
        )
        .catch(err => {
            console.log(err);
            return Promise.reject(new Error("Can't insert user profile data"));
        });
};

exports.getUser = email => {
    return db.query(
        `SELECT * FROM users
            LEFT JOIN signatures ON signatures.user_id = users.id
            LEFT JOIN user_profiles ON user_profiles.user_id = users.id
        WHERE users.email = $1;`,
        [email]
    );
};

exports.getUsers = () => {
    return db.query(
        `SELECT * FROM users
            LEFT JOIN user_profiles ON user_profiles.user_id = users.id;`
    );
};

// -------------------------------------------------------
// -------------------------------------------------------
// NEW STUFF
// -------------------------------------------------------
// -------------------------------------------------------

exports.getFileThree = () => {
    const { readdir, stat } = require("fs").promises;
    const path = `${__dirname}/db`;

    // Part 1
    function getFiles(path) {
        return readdir(path, { withFileTypes: true }).then(files => {
            let arr = [];
            // console.log("getFiles returned files");
            for (let i = 0; i < files.length; i++) {
                let newPath = `${path}/${files[i].name}`;
                if (files[i].isDirectory()) {
                    // console.log(files[i].name, "is a directory!");
                    arr.push(getFiles(newPath));
                } else if (files[i].isFile()) {
                    // console.log(files[i].name, "is a file!");
                    arr.push(
                        stat(`${newPath}`).then(stats => {
                            console.log(`${newPath}: ${stats.size}`);
                        })
                    );
                }
            }
            return Promise.all(arr);
        });
    }
    getFiles(path).then(() => console.log("Done!"));
};

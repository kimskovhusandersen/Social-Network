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
const { promisify } = require("util");
let { genSalt, hash } = require("bcryptjs");
hash = promisify(hash);
genSalt = promisify(genSalt);

const hashPassword = password => genSalt().then(salt => hash(password, salt));

const addUser = ({ firstname, lastname, email, password }) => {
    return hashPassword(password).then(hashedPassword => {
        return db.query(
            `INSERT INTO users (firstname, lastname, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING *;`,
            [firstname, lastname, email, hashedPassword]
        );
    });
};

module.exports = addUser;

const express = require("express");
const router = express.Router();
const db = require("./db");
const sess = require("./session");

router.post("/users", (req, res) => {
    db.addUser(req.body)
        .then(({ rows }) => {
            return sess.addUser(req, rows[0]);
        })
        .catch(err => {
            console.log("BACK IN ROUTE. ERR: ", err);
            res.json(err);
        });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("./db");

console.log("LOGGING DB IN AUTH", db);

router.post("/login", (req, res) => {
    db.login(req)
        .then(result => {
            res.redirect("/");
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;

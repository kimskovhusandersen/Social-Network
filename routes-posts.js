const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/api/posts", async (req, res) => {
    try {
        req.body.profileId = req.session.profileId;
        const { rows } = await db.addPost(req.body);
        console.log(rows);
        if (rows) {
            res.json(rows);
        }
    } catch (err) {
        return res.json(err);
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("./db");
const io = require("./socket");

router.post("/api/posts", async (req, res) => {
    try {
        req.body.profileId = req.session.profileId;
        const { rows: post } = await db.addPost(req.body);
        console.log(post);
        io.getIo().emit("posts", {
            action: "addPost",
            payload: post
        });
        if (rows) {
            res.json(rows);
        }
    } catch (err) {
        return res.json(err);
    }
});

router.get("/api/posts", async (req, res) => {
    const { profileId } = req.session;
    try {
        let { rows } = await db.getPosts(profileId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

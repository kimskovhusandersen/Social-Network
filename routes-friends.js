const express = require("express");
const router = express.Router();
const db = require("./db");

// CREATE
router.post("/api/friends/:id/add", async (req, res) => {
    try {
        req.body.senderId = req.session.profileId;
        req.body.receiverId = req.params.id;
        const { rows } = await db.addFriend(req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.post("/api/friends/:id/accept", async (req, res) => {
    try {
        req.body.senderId = req.params.id;
        req.body.receiverId = req.session.profileId;
        const { rows } = await db.acceptFriend(req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.post("/api/friends/:id/delete", async (req, res) => {
    try {
        req.body.senderId = req.session.profileId;
        req.body.receiverId = req.params.id;
        const { rows } = await db.deleteFriend(req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// READ
router.get("/api/friends", async (req, res) => {
    try {
        const { profileId } = req.session;
        const { rows } = await db.getFriends(profileId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/friend-requests", async (req, res) => {
    try {
        const { profileId } = req.session;
        const { rows } = await db.getFriendRequests(profileId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/friends/:id", async (req, res) => {
    try {
        req.body.senderId = req.params.id;
        req.body.receiverId = req.session.profileId;
        const { rows } = await db.getFriend(req.body);
        if (rows[0]) {
            res.json(rows);
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

// DELETE

module.exports = router;

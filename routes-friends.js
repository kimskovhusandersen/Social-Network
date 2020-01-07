const express = require("express");
const router = express.Router();
const db = require("./db");

// CREATE
router.post("/api/friends", async (req, res) => {
    try {
        req.body.senderId = req.session.profileId;
        const { rows } = await db.addFriend(req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.post("/api/friends/accept", async (req, res) => {
    try {
        req.body.receiverId = req.session.profileId;
        const { rows } = await db.acceptFriend(req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.post("/api/friends/delete", async (req, res) => {
    try {
        req.body.senderId = req.session.profileId;
        const { rows } = await db.deleteFriend(req.body);
        res.json([
            {
                accepted: null,
                receiverId: null,
                senderId: null
            }
        ]);
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
        console.log("IN GET FRIEND REUQAUEST", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/friends/:id", async (req, res) => {
    try {
        const senderId = req.params.id;
        const receiverId = req.session.profileId;
        const { rows } = await db.getFriend(senderId, receiverId);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.get(
    "/api/profiles/:profileId/friends/search/:query",
    async (req, res) => {
        const { query, profileId } = req.params;
        try {
            const { rows } = await db.getFriendsBySearch(query, profileId);
            res.json(rows);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    }
);

// DELETE

module.exports = router;

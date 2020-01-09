const express = require("express");
const router = express.Router();
const db = require("./db");
const io = require("./socket");

// CREATE
router.post("/api/friends", async (req, res) => {
    try {
        req.body.senderId = req.session.profileId;

        let data = await Promise.all([
            db.addFriend(req.body),
            db.getProfile(req.body.senderId),
            db.getProfile(req.body.receiverId)
        ]);
        [{ rows: status }, { rows: sender }, { rows: receiver }] = data;
        sender = [
            {
                ...sender[0],
                accepted: status[0].accepted,
                sender_id: status[0].sender_id,
                receiver_id: status[0].receiver_id
            }
        ];
        receiver = [
            {
                ...receiver[0],
                accepted: status[0].accepted,
                sender_id: status[0].sender_id,
                receiver_id: status[0].receiver_id
            }
        ];

        console.log(sender, receiver);
        io.getIo()
            .to(req.body.receiverId)
            .emit("friends", {
                action: "addFriendRequest",
                payload: sender
            });
        res.json(receiver);
    } catch (err) {
        res.json(err);
    }
});

router.post("/api/friends/accept", async (req, res) => {
    try {
        req.body.receiverId = req.session.profileId;

        let data = await Promise.all([
            db.acceptFriend(req.body),
            db.getProfile(req.body.senderId),
            db.getProfile(req.body.receiverId)
        ]);
        [{ rows: status }, { rows: sender }, { rows: receiver }] = data;
        sender = [
            {
                ...sender[0],
                accepted: status[0].accepted,
                sender_id: status[0].sender_id,
                receiver_id: status[0].receiver_id
            }
        ];
        receiver = [
            {
                ...receiver[0],
                accepted: status[0].accepted,
                sender_id: status[0].sender_id,
                receiver_id: status[0].receiver_id
            }
        ];
        console.log(sender, receiver);
        io.getIo()
            .to(req.body.senderId)
            .emit("friends", {
                action: "acceptFriendRequest",
                payload: receiver
            });
        res.json(sender);
    } catch (err) {
        res.json(err);
    }
});

router.post("/api/friends/delete", async (req, res) => {
    try {
        req.body.senderId = req.session.profileId;
        const { rows: status } = await db.deleteFriend(req.body);
        let otherProfileId =
            req.session.profileId === status[0].sender_id
                ? status[0].receiver_id
                : status[0].sender_id;
        let data = await Promise.all([
            db.getProfile(req.session.profileId),
            db.getProfile(otherProfileId)
        ]);
        [{ rows: profile }, { rows: otherProfile }] = data;
        profile = [
            {
                ...profile[0],
                accepted: null,
                sender_id: null,
                receiver_id: null
            }
        ];
        otherProfile = [
            {
                ...otherProfile[0],
                accepted: null,
                sender_id: null,
                receiver_id: null
            }
        ];

        io.getIo()
            .to(otherProfileId)
            .emit("friends", {
                action: "deleteFriendRequest",
                payload: profile
            });
        res.json(otherProfile);
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

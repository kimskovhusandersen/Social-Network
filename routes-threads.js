const express = require("express");
const router = express.Router();
const db = require("./db");

// READ
router.get("/api/threads", async (req, res) => {
    try {
        const { profileId } = req.session;
        const { rows } = await db.getThreads(profileId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/threads/:id", async (req, res) => {
    try {
        const { profileId } = req.session;
        const { id } = req.params;
        console.log("IN ROUTE", profileId, id);
        const { rows } = await db.getThread(profileId, id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/threads/:threadId/messages", async (req, res) => {
    try {
        const { threadId } = req.params;
        const { rows } = await db.getMessages(threadId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// CREATE Messages
router.post("/api/threads/:threadId/messages", async (req, res) => {
    console.log("IN ROUTE", req.body);
    try {
        const { rows } = await db.addMessage(req.body);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

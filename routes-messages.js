const express = require("express");
const router = express.Router();
const db = require("./db");

// READ
router.get("/api/messages", async (req, res) => {
    try {
        const { threadId } = req.params;
        const { rows } = await db.getMessages(threadId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

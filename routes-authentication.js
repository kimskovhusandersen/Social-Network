const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/login", async (req, res) => {
    try {
        await db.login(req, req.body);
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

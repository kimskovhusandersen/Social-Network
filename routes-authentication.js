const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/api/login", async (req, res) => {
    try {
        await db.login(req, req.body);
        res.json([{ data: "success" }]);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/logout", async (req, res) => {
    try {
        delete req.session.profileId;
        res.json([{ data: "success" }]);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("./db");

// CREATE
router.post("/profiles", async (req, res) => {
    try {
        const { rows } = await db.addProfile(req.body);
        req.session.profileId = rows[0].id;
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

// READ
router.get("/profiles", async (req, res) => {
    const { profileId: id } = req.session;
    try {
        let { rows } = await db.getProfile(id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// UPDATE
router.post("/update-profile", async (req, res) => {
    try {
        req.body.id = req.session.profileId;
        const { rows } = await db.updateProfile(req.body);
        if (rows) res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// DELETE

module.exports = router;

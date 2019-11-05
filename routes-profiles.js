const express = require("express");
const router = express.Router();
const db = require("./db");

// CREATE
router.post("/api/profiles", async (req, res) => {
    try {
        const { rows } = await db.addProfile(req.body);
        req.session.profileId = rows[0].id;
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

// READ
router.get("/api/profiles/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let { rows } = await db.getProfile(id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// READ
router.get("/api/my-profile", async (req, res) => {
    const { profileId: id } = req.session;
    try {
        let { rows } = await db.getProfile(id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/profiles/search/:query", async (req, res) => {
    const { query } = req.params;
    const { profileId } = req.session;
    try {
        if (query != "") {
            let { rows } = await db.getProfilesBySearch(query, profileId);
            res.json(rows);
        }
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/recent-profiles", async (req, res) => {
    const { profileId } = req.session;
    try {
        let { rows } = await db.getMostRecentProfiles(profileId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// UPDATE
router.post("/api/my-profile/edit", async (req, res) => {
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

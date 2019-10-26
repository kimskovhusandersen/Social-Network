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

// UPSERT
router.post("/profiles/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.upsertProfile(req.body, id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// READ
router.get("/profiles", async (req, res) => {
    const { profileId: id } = req.session;
    try {
        let { rows } = await db.getProfile(id);
        console.log("LOGGIN IN ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

// DELETE

module.exports = router;

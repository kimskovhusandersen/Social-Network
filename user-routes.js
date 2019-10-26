const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/users", async (req, res) => {
    try {
        const { rows } = await db.addUser(req.body);
        req.session.userId = rows[0].id;
        res.json({ data: "success" });
    } catch (err) {
        res.json(err);
    }
});

router.get("/user", async (req, res) => {
    const { userId } = req.session;
    try {
        let { rows } = await db.getUser(userId);
        console.log("LOGGING ROWS IN USER-ROUTE", rows);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

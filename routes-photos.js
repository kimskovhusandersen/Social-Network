const express = require("express");
const router = express.Router();
const s3 = require("./s3");
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { S3_URL: s3Url } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("./secrets.json");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

router.post(
    "/api/photos",
    uploader.single("photo"),
    s3.upload,
    async (req, res) => {
        try {
            req.body.url = `${s3Url}${req.file.filename}`;
            req.body.profileId = req.session.profileId;
            const { rows } = await db.addPhoto(req.body);
            if (rows) {
                res.json(rows);
            }
        } catch (err) {
            return res.json(err);
        }
    }
);

// READ

router.get("/api/photos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let { rows } = await db.getPhotos(id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/my-photos", async (req, res) => {
    const { profileId } = req.session;
    try {
        let { rows } = await db.getPhotos(profileId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/profile-photo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let { rows } = await db.getProfilePhoto(id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/my-profile-photo", async (req, res) => {
    const { profileId: id } = req.session;
    try {
        let { rows } = await db.getProfilePhoto(id);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

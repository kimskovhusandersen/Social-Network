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
    "/photos",
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
router.get("/profile-photo", async (req, res) => {
    try {
        let { rows } = await db.getProfilePhoto(req.session.profileId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

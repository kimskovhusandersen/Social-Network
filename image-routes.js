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
    "/images",
    uploader.single("image"),
    s3.upload,
    async (req, res) => {
        try {
            req.body.url = `${s3Url}${req.file.filename}`;
            var { rows } = await db.addImage(req.body);
        } catch (err) {
            return res.json(err);
        }
        if (req.body.user_profile_image) {
            try {
                const { userId } = req.body;
                const imageId = rows[0].id;
                await db.upsertProfileImage(userId, imageId);
            } catch (err) {
                return res.json(err);
            }
        }
        res.json(rows);
    }
);

module.exports = router;

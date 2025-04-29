    const express = require("express");
    const router = express.Router();
    const upload = require("../middlewares/upload");
    const auth = require("../middlewares/authMiddleware");

    router.post("/", auth, upload.single("image"), (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "Upload failed" });
    }

    res.status(200).json({ imageUrl: req.file.path });
    });

    module.exports = router;

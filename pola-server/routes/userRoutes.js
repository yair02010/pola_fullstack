    const express = require("express");
    const router = express.Router();
    const {
    getWishlist,
    toggleWishlist,
    getAllUsers
    } = require("../controllers/userController");
    const auth = require("../middlewares/authMiddleware");
    const admin = require("../middlewares/adminMiddleware");

    router.get("/all", auth, admin, getAllUsers);

    router.get("/wishlist", auth, getWishlist);
    router.post("/wishlist", auth, toggleWishlist);

    module.exports = router;

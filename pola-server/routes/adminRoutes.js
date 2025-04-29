const express = require("express");
const router = express.Router();
const { getAdminSummary, getAllUsers } = require("../controllers/adminController");
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.get("/summary", auth, admin, getAdminSummary);
router.get("/users", auth, admin, getAllUsers);

module.exports = router;

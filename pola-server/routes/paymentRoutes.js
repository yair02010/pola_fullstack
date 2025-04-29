const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/paymentController");
const auth = require("../middlewares/authMiddleware");

router.post("/checkout", auth, createCheckoutSession);

module.exports = router;

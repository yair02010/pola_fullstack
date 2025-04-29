    const express = require("express");
    const router = express.Router();
    const {
    addReview,
    getProductReviews
    } = require("../controllers/reviewController");

    const auth = require("../middlewares/authMiddleware");
    const validateBody = require("../middlewares/validateBody");
    const { reviewSchema } = require("../validations/reviewValidation");

    router.post("/", auth, validateBody(reviewSchema), addReview);
    router.get("/product/:productId", getProductReviews);

    module.exports = router;

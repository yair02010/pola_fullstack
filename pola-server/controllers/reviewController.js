    const Review = require("../models/Review");

    const addReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;

        const review = await Review.create({
        user: req.user.userId,
        product,
        rating,
        comment
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ message: "Failed to submit review", error: err.message });
    }
    };

    const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate("user", "name");
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
    };

    module.exports = { addReview, getProductReviews };

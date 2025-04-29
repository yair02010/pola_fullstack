    const User = require("../models/User");
    const Product = require("../models/Product");
    const Order = require("../models/Order");

    // Get admin dashboard summary
    const getAdminSummary = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const productsCount = await Product.countDocuments();
        const orders = await Order.find();

        const ordersCount = orders.length;
        const totalIncome = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.json({ usersCount, productsCount, ordersCount, totalIncome });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch summary", error: err.message });
    }
    };

    // Get all users (admin)
    const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
    };

    module.exports = {
    getAdminSummary,
    getAllUsers,
    };

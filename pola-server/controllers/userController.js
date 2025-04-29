    const User = require("../models/User");

    // 📄 Get user profile
    const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to load profile" });
    }
    };

    // ✏️ Update user profile
    const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;

        if (req.body.password) {
        user.password = req.body.password;
        }

        await user.save();

        res.json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile" });
    }
    };

    // 💖 Get wishlist
    const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate("wishlist");
        res.json(user.wishlist);
    } catch (err) {
        console.error("Wishlist fetch error:", err);
        res.status(500).json({ message: "Failed to load wishlist" });
    }
    };

    // 💖 Toggle wishlist (add/remove product)
    const toggleWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const { productId } = req.body;

        if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
        }

        const index = user.wishlist.indexOf(productId);
        if (index > -1) {
        user.wishlist.splice(index, 1); // remove
        } else {
        user.wishlist.push(productId); // add
        }

        await user.save();
        res.json({ wishlist: user.wishlist });
    } catch (err) {
        console.error("Wishlist update error:", err);
        res.status(500).json({ message: "Failed to update wishlist", error: err.message });
    }
    };

    // 📋 Get all users (Admin only)
    const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        console.error("Failed to fetch users:", err);
        res.status(500).json({ message: "Failed to fetch users" });
    }
    };

    module.exports = {
    getMyProfile,
    updateProfile,
    getWishlist,
    toggleWishlist,
    getAllUsers,
    };

    const User = require("../models/User");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");

    // REGISTER
    const register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
    };

   // LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


    // GET MY PROFILE
    const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        console.error("Get profile error:", err.message);
        res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
    };

    // UPDATE PROFILE
    const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = {
        city: req.body.city || user.address?.city,
        street: req.body.street || user.address?.street,
        houseNumber: req.body.houseNumber || user.address?.houseNumber,
        floor: req.body.floor || user.address?.floor,
        apartment: req.body.apartment || user.address?.apartment,
        entrance: req.body.entrance || user.address?.entrance,
        zipCode: req.body.zipCode || user.address?.zipCode,
        };

        await user.save();

        res.json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        });
    } catch (err) {
        console.error("Update profile error:", err.message);
        res.status(500).json({ message: "Failed to update profile", error: err.message });
    }
    };

    module.exports = {
    register,
    login,
    getMyProfile,
    updateProfile,
    };

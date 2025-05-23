    const dotenv = require("dotenv");
    dotenv.config();

    const express = require("express");
    const cors = require("cors");
    const helmet = require("helmet");
    const connectDB = require("./config/db");

    // CORS setup
    const corsOptions = {
    origin: ["http://localhost:5173", "https://pola-fullstack-1.onrender.com"],
    credentials: true,
    };

    const authRoutes = require("./routes/authRoutes");
    const productRoutes = require("./routes/productRoutes");
    const categoryRoutes = require("./routes/categoryRoutes");
    const orderRoutes = require("./routes/orderRoutes");
    const reviewRoutes = require("./routes/reviewRoutes");
    const contactRoutes = require("./routes/contactRoutes");
    const uploadRoutes = require("./routes/uploadRoutes");
    const paymentRoutes = require("./routes/paymentRoutes");
    const userRoutes = require("./routes/userRoutes");
    const adminRoutes = require("./routes/adminRoutes");

    const app = express();

    // Connect to MongoDB
    connectDB();

    // Middleware
    app.use(cors(corsOptions)); // חייב לבוא לפני הראוטים
    app.use(express.json());
    app.use(helmet());

    // API Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/reviews", reviewRoutes);
    app.use("/api/contact", contactRoutes);
    app.use("/api/upload", uploadRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/admin", adminRoutes);

    // Default route
    app.get("/", (req, res) => {
    res.send("POLA API is running...");
    });

    // Error handler
    app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(500).json({ message: "Something went wrong on the server." });
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });

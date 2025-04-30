    const mongoose = require("mongoose");

    const connectDB = async () => {
    try {
        const mongoUri = process.env.NODE_ENV === "production"
        ? process.env.MONGO_ATLAS_URI
        : process.env.MONGO_LOCAL_URI;

        await mongoose.connect(mongoUri);

        console.log("MongoDB Connected ✅");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
    };

    module.exports = connectDB;

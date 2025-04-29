    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        address: {
            city: { type: String },
            street: { type: String },
            houseNumber: { type: String },
            floor: { type: String },
            apartment: { type: String },
            entrance: { type: String },
            zipCode: { type: String },
            },

        role: { type: String, enum: ["admin", "customer"], default: "customer" },
        wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        ],
    },
    { timestamps: true }
    );

    module.exports = mongoose.model("User", userSchema);

    const mongoose = require("mongoose");

    const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, enum: ["XS", "S", "M", "L", "XL"], required: true },
        color: { type: String },
        status: { type: String, enum: ["new", "used"], default: "used" },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        imageUrl: { type: String },
        inStock: { type: Boolean, default: true },
    },
    { timestamps: true }
    );

    module.exports = mongoose.model("Product", productSchema);

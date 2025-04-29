    const mongoose = require("mongoose");

    const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            imageUrl: { type: String },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
        ],
        deliveryMethod: { type: String, enum: ["pickup", "delivery"], required: true },
        shippingAddress: {
        street: String,
        houseNumber: String,
        city: String,
        zipCode: String,
        floor: String,
        apartment: String,
        entrance: String,
        },
        paymentMethod: { type: String, enum: ["credit_card", "cash_in_store", "cash_on_delivery"], required: true },
        totalAmount: { type: Number, required: true },
        status: { type: String, enum: ["pending", "paid", "shipped", "cancelled"], default: "pending" },
    },
    { timestamps: true }
    );

    module.exports = mongoose.model("Order", orderSchema);
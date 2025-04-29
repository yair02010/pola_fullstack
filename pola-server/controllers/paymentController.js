    const Stripe = require("stripe");
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const Product = require("../models/Product");
    const createCheckoutSession = async (req, res) => {
    try {
        const { items } = req.body;

        const products = await Promise.all(
        items.map(async (item) => {
            const product = await Product.findById(item.productId);
            return {
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            };
        })
        );

        const line_items = products.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
            name: item.name,
            },
            unit_amount: Math.round(item.price * 100), 
        },
        quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe error:", err);
        res.status(500).json({ message: "Stripe error", error: err.message });
    }
    };

    module.exports = { createCheckoutSession };

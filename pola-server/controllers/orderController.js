    const Order = require("../models/Order");
    const Product = require("../models/Product");
    const sendOrderConfirmation = require("../utils/mailer");
    const User = require("../models/User");

    const createOrder = async (req, res) => {
    try {
        const { items, deliveryMethod, paymentMethod, shippingAddress } = req.body;

        const orderItems = await Promise.all(
        items.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) throw new Error("Product not found");
            return {
            productId: product._id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: item.quantity,
            };
        })
        );

        const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const newOrder = await Order.create({
        user: req.user.userId,
        items: orderItems,
        deliveryMethod,
        paymentMethod,
        shippingAddress: deliveryMethod === "delivery" ? shippingAddress : {},
        totalAmount,
        });

        const user = await User.findById(req.user.userId);
        if (user && user.email) {
        await sendOrderConfirmation({
            to: user.email,
            name: user.name,
            orderId: newOrder._id,
            totalAmount: newOrder.totalAmount,
            paymentMethod: newOrder.paymentMethod,
        });
        }

        res.status(201).json(newOrder);
    } catch (err) {
        console.error("createOrder error:", err);
        res.status(500).json({ message: "Failed to create order" });
    }
    };

    const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate("user", "name email phone address")
        .populate("items.productId", "name price imageUrl");

        if (!order) return res.status(404).json({ message: "Order not found" });

        if (req.user.role !== "admin" && order.user._id.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Access denied" });
        }

        res.json(order);
    } catch (err) {
        console.error("getOrderById error:", err);
        res.status(500).json({ message: "Failed to load order" });
    }
    };

    const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "name email phone address")
        .populate("items.productId", "name price imageUrl");

        res.json(orders);
    } catch (err) {
        console.error("getAllOrders error:", err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
    };

    module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    };
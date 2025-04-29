    const Product = require("../models/Product");

    // GET all products
    const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
    };

    // GET single product
    const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch product" });
    }
    };

    // CREATE product (Admin)
    const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: "Failed to create product", error: err.message });
    }
    };

    // UPDATE product (Admin)
    const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Product not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: "Failed to update product", error: err.message });
    }
    };

    // DELETE product (Admin)
    const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product" });
    }
    };

    module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    };

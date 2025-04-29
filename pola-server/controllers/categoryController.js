    const Category = require("../models/Category");

    // GET all categories
    const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
    };

    // CREATE category (Admin)
    const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const exists = await Category.findOne({ name });
        if (exists) return res.status(400).json({ message: "Category already exists" });

        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: "Failed to create category", error: err.message });
    }
    };

    // DELETE category (Admin)
    const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete category" });
    }
    };

    module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
    };

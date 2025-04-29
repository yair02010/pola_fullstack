    const express = require("express");
    const router = express.Router();
    const {
    getAllCategories,
    createCategory,
    deleteCategory
    } = require("../controllers/categoryController");

    const auth = require("../middlewares/authMiddleware");
    const admin = require("../middlewares/adminMiddleware");
    const validateBody = require("../middlewares/validateBody");
    const { categorySchema } = require("../validations/categoryValidation");

    router.get("/", getAllCategories);
    router.post("/", auth, admin, validateBody(categorySchema), createCategory);
    router.delete("/:id", auth, admin, deleteCategory);

    module.exports = router;

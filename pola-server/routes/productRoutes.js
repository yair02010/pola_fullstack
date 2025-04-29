    const express = require("express");
    const router = express.Router();
    const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
    } = require("../controllers/productController");
    const auth = require("../middlewares/authMiddleware");
    const admin = require("../middlewares/adminMiddleware");
    const validateBody = require("../middlewares/validateBody");
    const { productSchema } = require("../validations/productValidation");

    router.get("/", getAllProducts);
    router.get("/:id", getProductById);
    router.post("/", auth, admin, validateBody(productSchema), createProduct);
    router.put("/:id", auth, admin, validateBody(productSchema), updateProduct);
    router.delete("/:id", auth, admin, deleteProduct);

    module.exports = router;

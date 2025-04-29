    const express = require("express");
    const router = express.Router();

    const { createOrder, getAllOrders, getOrderById } = require("../controllers/orderController");
    const auth = require("../middlewares/authMiddleware");
    const admin = require("../middlewares/adminMiddleware");
    const validateBody = require("../middlewares/validateBody");
    const { orderValidationSchema } = require("../validations/orderValidation");

    router.post("/", auth, validateBody(orderValidationSchema), createOrder);
    router.get("/", auth, admin, getAllOrders);
    router.get("/:id", auth, getOrderById);

    module.exports = router;

    const express = require("express");
    const router = express.Router();
    const {
    sendMessage,
    getAllMessages
    } = require("../controllers/contactController");

    const auth = require("../middlewares/authMiddleware");
    const admin = require("../middlewares/adminMiddleware");
    const validateBody = require("../middlewares/validateBody");
    const { contactSchema } = require("../validations/contactValidation");

    router.post("/", validateBody(contactSchema), sendMessage);
    router.get("/", auth, admin, getAllMessages);

    module.exports = router;

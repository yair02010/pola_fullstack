    const express = require("express");
    const router = express.Router();

    const {
    register,
    login,
    getMyProfile,
    updateProfile
    } = require("../controllers/authController");

    const auth = require("../middlewares/authMiddleware");
    const validateBody = require("../middlewares/validateBody");
    const { registerSchema, loginSchema } = require("../validations/userValidation");

    // REGISTER
    router.post("/register", validateBody(registerSchema), register);

    // LOGIN
    router.post("/login", validateBody(loginSchema), login);

    // GET PROFILE (Authenticated user)
    router.get("/me", auth, getMyProfile);

    // UPDATE PROFILE
    router.put("/profile", auth, updateProfile);

    module.exports = router;

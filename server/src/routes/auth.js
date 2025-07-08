import express from "express";
import { AuthController } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { registerValidation, loginValidation } from "../utils/validation.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);

// Protected routes
router.get("/profile", authenticate, AuthController.getProfile);
router.post("/logout", authenticate, AuthController.logout);

export default router;

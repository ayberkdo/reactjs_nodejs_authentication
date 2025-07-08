import express from "express";
import { UserController } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { updateUserValidation } from "../utils/validation.js";

const router = express.Router();

// All user routes are protected
router.use(authenticate);

// User management routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", updateUserValidation, UserController.updateUser);
router.patch("/:id/toggle-status", UserController.toggleUserStatus);
router.delete("/:id", UserController.deleteUser);

export default router;

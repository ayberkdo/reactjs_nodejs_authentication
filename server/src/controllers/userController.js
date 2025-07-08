import { validationResult } from "express-validator";
import User from "../database/models/User.js";

export class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        success: true,
        data: {
          users: users.map((user) => user.toJSON()),
          count: users.length,
        },
      });
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: {
          user: user.toJSON(),
        },
      });
    } catch (error) {
      console.error("Get user by ID error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async updateUser(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const updateData = req.body;

      // Find user
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if trying to update email to an existing one
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findByEmail(updateData.email);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }
      }

      // Update user
      await user.update(updateData);

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: {
          user: user.toJSON(),
        },
      });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Prevent users from deleting themselves
      if (parseInt(id) === req.user.id) {
        return res.status(400).json({
          success: false,
          message: "You cannot delete your own account",
        });
      }

      // Find user
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Delete user
      await user.destroy();

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;

      // Find user
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Prevent users from deactivating themselves
      if (parseInt(id) === req.user.id) {
        return res.status(400).json({
          success: false,
          message: "You cannot deactivate your own account",
        });
      }

      // Toggle active status
      await user.update({ isActive: !user.isActive });

      res.status(200).json({
        success: true,
        message: `User ${
          user.isActive ? "activated" : "deactivated"
        } successfully`,
        data: {
          user: user.toJSON(),
        },
      });
    } catch (error) {
      console.error("Toggle user status error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

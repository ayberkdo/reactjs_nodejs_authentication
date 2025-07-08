import { validationResult } from "express-validator";
import User from "../database/models/User.js";
import { generateToken } from "../middleware/auth.js";

export class AuthController {
  static async register(req, res) {
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

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      }

      // Create new user
      const newUser = await User.createUser({
        name,
        email,
        password,
        role: "user",
      });

      // Generate JWT token
      const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: newUser,
          token,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async login(req, res) {
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

      const { email, password } = req.body;

      // Find user by email (include password for validation)
      const user = await User.findOne({
        where: { email },
        attributes: [
          "id",
          "name",
          "email",
          "password",
          "role",
          "isActive",
          "createdAt",
        ],
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account is deactivated",
        });
      }

      // Validate password
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Remove password from response
      const userResponse = user.toJSON();

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: userResponse,
          token,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

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
      console.error("Get profile error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async logout(req, res) {
    // Since we're using stateless JWT, logout is handled on the client side
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
}

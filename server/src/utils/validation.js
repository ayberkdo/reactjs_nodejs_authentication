import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

export const updateUserValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
];

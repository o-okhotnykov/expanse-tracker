import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];
export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const budgetValidation = [
  body("name").isLength({ min: 3 }).withMessage("Invalid name"),
  body("amount").isNumeric().withMessage("Invalid amount"),
  body("date").isISO8601().withMessage("Invalid date"),
  body("type").isString(),
  body("category").isLength({ min: 3 }).withMessage("Invalid type"),
];

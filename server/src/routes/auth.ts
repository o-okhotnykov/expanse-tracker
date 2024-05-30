import express from "express";
import { UserController } from "../controllers";
import { checkAuth, handleValidationError } from "../utils";
import { loginValidation, registerValidation } from "../validations/validation";

export const router = express.Router();

router.post(
  "/login",
  loginValidation,
  handleValidationError,
  UserController.login
);
router.post(
  "/register",
  registerValidation,
  handleValidationError,
  UserController.register
);

router.get("/me", checkAuth, UserController.getMe);

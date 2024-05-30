import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers";
import { checkAuth, handleValidationError } from "../utils";
import { loginValidation, registerValidation } from "../validations/validation";
import { AppError, errorHandler } from "../exceptions";

export const router = Router();

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

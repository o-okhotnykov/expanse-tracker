import express from "express";
import { BudgetController } from "../controllers";
import { checkAuth, handleValidationError } from "../utils";
import { budgetValidation } from "../validations/validation";

export const router = express.Router();

router.get("", checkAuth, BudgetController.getAllBudgets);
router.get("/:id", BudgetController.getBudget);
router.delete("/:id", BudgetController.deleteBudget);
router.post(
  "",
  budgetValidation,
  handleValidationError,
  BudgetController.createBudget
);
router.patch(
  "/:id",
  budgetValidation,
  handleValidationError,
  BudgetController.updateBudget
);

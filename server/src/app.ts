import express from "express";
import mongoose from "mongoose";
import { budgetValidation, registerValidation } from "./validations/validation";
import { checkAuth, handleValidationError } from "./utils";
import { UserController, BudgetController } from "./controllers";

mongoose
  .connect(
    "mongodb+srv://admin:admin@database.828hvnq.mongodb.net/budget?retryWrites=true&w=majority&appName=database"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();
const port = 3000;

app.use(express.json());

app.post(
  "/auth/login",
  registerValidation,
  handleValidationError,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationError,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/budgets", BudgetController.getAllBudgets);
app.get("/budgets/:id", BudgetController.getBudget);
app.delete("/budgets/:id", checkAuth, BudgetController.deleteBudget);
app.post(
  "/budgets",
  checkAuth,
  budgetValidation,
  handleValidationError,
  BudgetController.createBudget
);
app.patch(
  "/budgets/:id",
  checkAuth,
  budgetValidation,
  handleValidationError,
  BudgetController.updateBudget
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

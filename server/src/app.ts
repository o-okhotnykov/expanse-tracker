import express from "express";
import mongoose from "mongoose";
import cors from "cors";
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
const port = 3004;

app.use(express.json());
app.use(cors());

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
app.delete("/budgets/:id", BudgetController.deleteBudget);
app.post(
  "/budgets",
  budgetValidation,
  handleValidationError,
  BudgetController.createBudget
);
app.patch(
  "/budgets/:id",
  budgetValidation,
  handleValidationError,
  BudgetController.updateBudget
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

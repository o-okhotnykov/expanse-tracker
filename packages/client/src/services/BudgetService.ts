import { createBudgetSchema } from "../../../server/src/validations";
import { trpc } from "./trpc";

class BudgetService {
  async getAllBudgets() {
    const result = await trpc.budget.getAllBudgets.query();

    return result;
  }
  async postBudget(payload: createBudgetSchema) {
    const result = await trpc.budget.postBudget.mutate(payload);

    return result;
  }
}

export const budgetService = new BudgetService();

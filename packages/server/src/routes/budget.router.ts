import { createBudget } from "../validations";
import { procedure, router } from "../trpc";
import { getBudgets, postBudget } from "../controllers/BudgetController";

export const budgetRouter = router({
  getAllBudgets: procedure.query(async () => {
    return await getBudgets();
  }),
  postBudget: procedure.input(createBudget).mutation(async ({ input }) => {
    return await postBudget(input);
  }),
});

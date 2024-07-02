import { budgetSchema } from "@expanse-tracker/server/src";

export interface BudgetState {
  budgets: budgetSchema[];
  balance: number;
}

export const state: BudgetState = {
  budgets: [],
  balance: 0,
};

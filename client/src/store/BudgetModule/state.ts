import { MoneyOperation } from "@expanse-tracker/shared";

export interface BudgetState {
  budgets: MoneyOperation[];
  balance: number;
}

export const state: BudgetState = {
  budgets: [],
  balance: 0,
};

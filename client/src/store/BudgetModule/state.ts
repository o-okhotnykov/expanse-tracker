import { MoneyOperation } from "@/types/budget";

export interface BudgetState {
  budgets: MoneyOperation[];
  balance: number;
}

export const state: BudgetState = {
  budgets: [],
  balance: 0,
};

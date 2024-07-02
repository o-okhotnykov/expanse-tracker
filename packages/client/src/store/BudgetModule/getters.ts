import { GetterTree } from "vuex";
import { MoneyOperation } from "@/types/budget";
import { BudgetState } from "./state";
import { CategoriesAmount } from "@/constants/categories";
import { RootState } from "..";
import { budgetSchema } from "@expanse-tracker/server/src";

export enum GetterBudgetsTypes {
  INCOMES = "INCOMES",
  EXPANSES = "EXPANSES",
  BALANCE = "BALANCE",
  CATEGORIES_EXPENSE_AMOUNT = "CATEGORIES_EXPENSE_AMOUNT",
  CATEGORIES_INCOME_AMOUNT = "CATEGORIES_INCOME_AMOUNT",
}

export type GettersBudgets = {
  [GetterBudgetsTypes.INCOMES](state: BudgetState): budgetSchema[];
  [GetterBudgetsTypes.EXPANSES](state: BudgetState): budgetSchema[];
  [GetterBudgetsTypes.BALANCE](
    state: BudgetState,
    getters: { incomes: MoneyOperation[]; expanses: MoneyOperation[] }
  ): number;
  [GetterBudgetsTypes.CATEGORIES_EXPENSE_AMOUNT](
    state: BudgetState,
    getters: { expanses: MoneyOperation[] }
  ): CategoriesAmount;
  [GetterBudgetsTypes.CATEGORIES_INCOME_AMOUNT](
    state: BudgetState,
    getters: { incomes: MoneyOperation[] }
  ): CategoriesAmount;
};

export const budgetsGetters: GetterTree<BudgetState, RootState> &
  GettersBudgets = {
  [GetterBudgetsTypes.INCOMES]: (state) => {
    return state.budgets.filter((income) => income.type === "expanse");
  },
  [GetterBudgetsTypes.EXPANSES]: (state) => {
    return state.budgets.filter((expanse) => expanse.type === "income");
  },
  [GetterBudgetsTypes.BALANCE]: (_, getters) => {
    const incomeBalance = getters.incomes.reduce(
      (acc, income) => acc + income.amount,
      0
    );
    const expanseBalance = getters.expanses.reduce(
      (acc, income) => acc + income.amount,
      0
    );

    return incomeBalance - expanseBalance;
  },
  [GetterBudgetsTypes.CATEGORIES_EXPENSE_AMOUNT]: (_, { expanses }) => {
    return expanses.reduce(
      (acc, { category, amount }) => ({
        ...acc,
        [category]: amount,
      }),
      {} as CategoriesAmount
    );
  },
  [GetterBudgetsTypes.CATEGORIES_INCOME_AMOUNT]: (_, { incomes }) => {
    return incomes.reduce(
      (acc, { category, amount }) => ({
        ...acc,
        [category]: amount,
      }),
      {} as CategoriesAmount
    );
  },
};

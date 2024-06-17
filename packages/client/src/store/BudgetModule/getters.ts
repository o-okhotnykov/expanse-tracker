import { GetterTree } from "vuex";
import { MoneyOperation, MoneyOperationType } from "@/types/budget";
import { BudgetState } from "./state";
import { CategoriesAmount } from "@/constants/categories";
import { RootState } from "..";

export type Getters = {
  incomes(state: BudgetState): MoneyOperation[];
  expanses(state: BudgetState): MoneyOperation[];
  balance(
    state: BudgetState,
    getters: { incomes: MoneyOperation[]; expanses: MoneyOperation[] }
  ): number;
  categoriesExpanseAmount(
    state: BudgetState,
    getters: { expanses: MoneyOperation[] }
  ): CategoriesAmount;
  categoriesIncomeAmount(
    state: BudgetState,
    getters: { incomes: MoneyOperation[] }
  ): CategoriesAmount;
};

export const getters: GetterTree<BudgetState, RootState> & Getters = {
  incomes: (state) => {
    return state.budgets.filter(
      (income) => income.type === MoneyOperationType.incomes
    );
  },
  expanses: (state) => {
    return state.budgets.filter(
      (expanse) => expanse.type === MoneyOperationType.expanses
    );
  },
  balance: (_, getters) => {
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
  categoriesExpanseAmount(_, { expanses }) {
    return expanses.reduce(
      (acc, { category, amount }) => ({
        ...acc,
        [category]: amount,
      }),
      {} as CategoriesAmount
    );
  },
  categoriesIncomeAmount(_, { incomes }) {
    return incomes.reduce(
      (acc, { category, amount }) => ({
        ...acc,
        [category]: amount,
      }),
      {} as CategoriesAmount
    );
  },
};

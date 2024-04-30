import { GetterTree } from "vuex";
import { MoneyOperation, MoneyOperationType } from "./types";
import { State } from "./state";
import { CategoriesAmount } from "@/constants/categories";

export type Getters = {
  incomes(state: State): MoneyOperation[];
  expanses(state: State): MoneyOperation[];
  balance(
    state: State,
    getters: { incomes: MoneyOperation[]; expanses: MoneyOperation[] }
  ): number;
  categoriesExpanseAmount(
    state: State,
    getters: { expanses: MoneyOperation[] }
  ): CategoriesAmount;
  categoriesIncomeAmount(
    state: State,
    getters: { incomes: MoneyOperation[] }
  ): CategoriesAmount;
};

export const getters: GetterTree<State, State> & Getters = {
  incomes: (state) => {
    return state.budgets.filter(
      (income) => income.type === MoneyOperationType.income
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

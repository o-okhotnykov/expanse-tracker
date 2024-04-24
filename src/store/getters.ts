import { GetterTree } from "vuex";
import { MoneyOperation, MoneyOperationType } from "./types";
import { State } from "./state";

export type Getters = {
  incomes(state: State): MoneyOperation[];
  expanses(state: State): MoneyOperation[];
  balance(
    state: State,
    getters: { incomes: MoneyOperation[]; expanses: MoneyOperation[] }
  ): number;
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
};

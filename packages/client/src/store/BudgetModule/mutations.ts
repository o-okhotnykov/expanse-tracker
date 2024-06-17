import { MutationTree } from "vuex";
import { MoneyOperation, MoneyOperationType } from "@/types/budget";
import { BudgetState } from "./state";

export enum MutationBudgetTypes {
  FETCH_BUDGETS = "FETCH_BUDGETS",
  ADD_BUDGET = "ADD_BUDGET",
  DELETE_BUDGET = "DELETE_BUDGET",
  PATCH_BUDGET = "PATCH_BUDGET",
}

export type Mutations<S = BudgetState> = {
  [MutationBudgetTypes.FETCH_BUDGETS](
    state: S,
    payload: MoneyOperation[]
  ): void;
  [MutationBudgetTypes.ADD_BUDGET](state: S, payload: MoneyOperation): void;
  [MutationBudgetTypes.DELETE_BUDGET](state: S, payload: { id: string }): void;
  [MutationBudgetTypes.PATCH_BUDGET](state: S, payload: MoneyOperation): void;
};

export const mutations: MutationTree<BudgetState> & Mutations = {
  [MutationBudgetTypes.FETCH_BUDGETS](state, payload: MoneyOperation[]) {
    state.budgets = payload;
  },
  [MutationBudgetTypes.ADD_BUDGET](state, payload: MoneyOperation) {
    state.budgets.push(payload);
    if (payload.type === MoneyOperationType.expanses) {
      state.balance -= Number(payload.amount);
    } else {
      state.balance += Number(payload.amount);
    }
  },
  [MutationBudgetTypes.DELETE_BUDGET](state, payload) {
    const index = state.budgets.findIndex(
      (budget) => budget._id === payload.id
    );
    if (index !== -1) {
      state.budgets.splice(index, 1);
    }
  },
  [MutationBudgetTypes.PATCH_BUDGET](state, payload: MoneyOperation) {
    const index = state.budgets.findIndex(
      (budget) => budget._id === payload._id
    );
    if (index !== -1) {
      state.budgets[index] = payload;
    }
  },
};

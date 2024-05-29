import { MutationTree } from "vuex";
import { MoneyOperation, MoneyOperationType } from "./types";
import { State } from "./state";

export enum MutationTypes {
  FETCH_BUDGETS = "FETCH_BUDGETS",
  ADD_BUDGET = "ADD_BUDGET",
  DELETE_BUDGET = "DELETE_BUDGET",
  PATCH_BUDGET = "PATCH_BUDGET",
}

export type Mutations<S = State> = {
  [MutationTypes.FETCH_BUDGETS](state: S, payload: MoneyOperation[]): void;
  [MutationTypes.ADD_BUDGET](state: S, payload: MoneyOperation): void;
  [MutationTypes.DELETE_BUDGET](state: S, payload: { id: string }): void;
  [MutationTypes.PATCH_BUDGET](state: S, payload: MoneyOperation): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.FETCH_BUDGETS](state, payload: MoneyOperation[]) {
    state.budgets = payload;
  },
  [MutationTypes.ADD_BUDGET](state, payload: MoneyOperation) {
    state.budgets.push(payload);
    if (payload.type === MoneyOperationType.expanses) {
      state.balance -= Number(payload.amount);
    } else {
      state.balance += Number(payload.amount);
    }
  },
  [MutationTypes.DELETE_BUDGET](state, payload) {
    const index = state.budgets.findIndex((budget) => budget.id === payload.id);
    if (index !== -1) {
      state.budgets.splice(index, 1);
    }
  },
  [MutationTypes.PATCH_BUDGET](state, payload: MoneyOperation) {
    const index = state.budgets.findIndex((budget) => budget.id === payload.id);
    if (index !== -1) {
      state.budgets[index] = payload;
    }
  },
};

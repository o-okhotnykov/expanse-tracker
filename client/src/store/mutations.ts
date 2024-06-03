import { MutationTree } from "vuex";
import { MoneyOperation, MoneyOperationType } from "./types";
import { State } from "./state";
import { responseUser } from "@/types/auth";

export enum MutationTypes {
  FETCH_BUDGETS = "FETCH_BUDGETS",
  ADD_BUDGET = "ADD_BUDGET",
  DELETE_BUDGET = "DELETE_BUDGET",
  PATCH_BUDGET = "PATCH_BUDGET",
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
}

export type Mutations<S = State> = {
  [MutationTypes.FETCH_BUDGETS](state: S, payload: MoneyOperation[]): void;
  [MutationTypes.ADD_BUDGET](state: S, payload: MoneyOperation): void;
  [MutationTypes.DELETE_BUDGET](state: S, payload: { id: string }): void;
  [MutationTypes.PATCH_BUDGET](state: S, payload: MoneyOperation): void;
  [MutationTypes.REGISTER_USER](state: S, payload: responseUser): void;
  [MutationTypes.LOGIN_USER](state: S, payload: responseUser): void;
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
    const index = state.budgets.findIndex(
      (budget) => budget._id === payload.id
    );
    if (index !== -1) {
      state.budgets.splice(index, 1);
    }
  },
  [MutationTypes.PATCH_BUDGET](state, payload: MoneyOperation) {
    const index = state.budgets.findIndex(
      (budget) => budget._id === payload._id
    );
    if (index !== -1) {
      state.budgets[index] = payload;
    }
  },
  [MutationTypes.REGISTER_USER](state, payload: responseUser) {
    state.user = payload;
  },
  [MutationTypes.LOGIN_USER](state, payload: responseUser) {
    state.user = payload;
    console.log(state);
  },
};

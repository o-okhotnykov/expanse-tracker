import { MutationTree } from "vuex";
import {
  budgetSchema,
  createBudgetSchema,
} from "@expanse-tracker/server/src";
import { BudgetState } from "./state";

export enum MutationBudgetTypes {
  FETCH_BUDGETS = "FETCH_BUDGETS",
  ADD_BUDGET = "ADD_BUDGET",
  DELETE_BUDGET = "DELETE_BUDGET",
  PATCH_BUDGET = "PATCH_BUDGET",
}

export type MutationsBudget<S = BudgetState> = {
  [MutationBudgetTypes.FETCH_BUDGETS](state: S, payload: budgetSchema[]): void;
  [MutationBudgetTypes.ADD_BUDGET](state: S, payload: createBudgetSchema): void;
  [MutationBudgetTypes.DELETE_BUDGET](state: S, payload: { id: string }): void;
  // [MutationBudgetTypes.PATCH_BUDGET](state: S, payload: MoneyOperation): void;
};

export const budgetsMutations: MutationTree<BudgetState> & MutationsBudget = {
  [MutationBudgetTypes.FETCH_BUDGETS](state, payload: budgetSchema[]) {
    state.budgets = payload;
  },
  [MutationBudgetTypes.ADD_BUDGET](state, payload) {
    state.budgets.push(payload);
    if (payload.type === "expanse") {
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
  // [MutationBudgetTypes.PATCH_BUDGET](state, payload: MoneyOperation) {
  //   const index = state.budgets.findIndex(
  //     (budget) => budget._id === payload._id
  //   );
  //   if (index !== -1) {
  //     state.budgets[index] = payload;
  //   }
  // },
};

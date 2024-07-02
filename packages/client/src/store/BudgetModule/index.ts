import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module,
} from "vuex";
import { RootState } from "@/store";
import { ActionsBudgets, budgetsActions, ActionBudgetTypes } from "./actions";
import { GettersBudgets, budgetsGetters, GetterBudgetsTypes } from "./getters";
import {
  MutationsBudget,
  budgetsMutations,
  MutationBudgetTypes,
} from "./mutations";
import { BudgetState, state } from "./state";
export type { BudgetState, ActionsBudgets, GettersBudgets, MutationsBudget };
export { ActionBudgetTypes, GetterBudgetsTypes, MutationBudgetTypes };

export type BudgetsStore<S = BudgetState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof MutationsBudget,
    P extends Parameters<MutationsBudget[K]>[1]
  >(
    key: K,
    payloads: P,
    options?: CommitOptions
  ): ReturnType<MutationsBudget[K]>;
} & {
  dispatch<K extends keyof ActionsBudgets>(
    key: K,
    payload?: Parameters<ActionsBudgets[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionsBudgets[K]>;
} & {
  getters: {
    [K in keyof GettersBudgets]: ReturnType<GettersBudgets[K]>;
  };
};

export const moduleBudget: Module<BudgetState, RootState> = {
  namespaced: true,
  state,
  actions: budgetsActions,
  mutations: budgetsMutations,
  getters: budgetsGetters,
};

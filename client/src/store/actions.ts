import { budgetService } from "@/services/BudgetService";
import { MoneyOperation, ResponseBudget } from "./types";
import { ActionContext, ActionTree } from "vuex";
import { MutationTypes, Mutations } from "./mutations";
import { State } from "./state";
import { loginSchema, registerSchema } from "@/types/auth";
import { authService } from "@/services/AuthService";

export enum ActionTypes {
  POST_BUDGET = "POST_BUDGET",
  FETCH_BUDGETS = "FETCH_BUDGETS",
  DELETE_BUDGET = "DELETE_BUDGET",
  PATCH_BUDGET = "PATCH_BUDGET",
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.POST_BUDGET](
    { commit }: AugmentedActionContext,
    payload: ResponseBudget
  ): Promise<void>;
  [ActionTypes.REGISTER_USER](
    { commit }: AugmentedActionContext,
    payload: registerSchema
  ): Promise<void>;
  [ActionTypes.LOGIN_USER](
    { commit }: AugmentedActionContext,
    payload: loginSchema
  ): Promise<void>;
  [ActionTypes.FETCH_BUDGETS]({
    commit,
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.DELETE_BUDGET](
    { commit }: AugmentedActionContext,
    payload: { id: string }
  ): Promise<void>;
  [ActionTypes.PATCH_BUDGET](
    { commit }: AugmentedActionContext,
    payload: MoneyOperation
  ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.POST_BUDGET]({ commit }, payload: MoneyOperation) {
    try {
      await budgetService.postBudget(payload);
      commit(MutationTypes.ADD_BUDGET, payload);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.FETCH_BUDGETS]({ commit }) {
    try {
      const data = await budgetService.getAllBudgets();
      commit(MutationTypes.FETCH_BUDGETS, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.DELETE_BUDGET]({ commit }, payload) {
    try {
      await budgetService.deleteBudget(payload.id);
      commit(MutationTypes.DELETE_BUDGET, { id: payload.id });
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.PATCH_BUDGET]({ commit }, payload: MoneyOperation) {
    try {
      await budgetService.patchBudget(payload);
      commit(MutationTypes.PATCH_BUDGET, payload);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.REGISTER_USER]({ commit }, payload: registerSchema) {
    try {
      const data = await authService.registerUser(payload);
      commit(MutationTypes.REGISTER_USER, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionTypes.LOGIN_USER]({ commit }, payload: loginSchema) {
    try {
      console.log(payload);
      const data = await authService.loginUser(payload);
      commit(MutationTypes.LOGIN_USER, data);
    } catch (error) {
      console.log(error);
    }
  },
};

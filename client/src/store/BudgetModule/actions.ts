import { budgetService } from "@/services/BudgetService";
import { MoneyOperation, ResponseBudget } from "@shared/budget";
import { ActionContext, ActionTree } from "vuex";
import { MutationBudgetTypes, Mutations } from "./mutations";
import { BudgetState } from "./state";
import { RootState } from "..";

export enum ActionBudgetTypes {
  POST_BUDGET = "POST_BUDGET",
  FETCH_BUDGETS = "FETCH_BUDGETS",
  DELETE_BUDGET = "DELETE_BUDGET",
  PATCH_BUDGET = "PATCH_BUDGET",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<BudgetState, RootState>, "commit">;

export interface Actions {
  [ActionBudgetTypes.POST_BUDGET](
    { commit }: AugmentedActionContext,
    payload: ResponseBudget
  ): Promise<void>;
  [ActionBudgetTypes.FETCH_BUDGETS]({
    commit,
  }: AugmentedActionContext): Promise<void>;
  [ActionBudgetTypes.DELETE_BUDGET](
    { commit }: AugmentedActionContext,
    payload: { id: string }
  ): Promise<void>;
  [ActionBudgetTypes.PATCH_BUDGET](
    { commit }: AugmentedActionContext,
    payload: MoneyOperation
  ): Promise<void>;
}

export const actions: ActionTree<BudgetState, RootState> & Actions = {
  async [ActionBudgetTypes.POST_BUDGET]({ commit }, payload: MoneyOperation) {
    try {
      await budgetService.postBudget(payload);
      commit(MutationBudgetTypes.ADD_BUDGET, payload);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionBudgetTypes.FETCH_BUDGETS]({ commit }) {
    try {
      const data = await budgetService.getAllBudgets();
      commit(MutationBudgetTypes.FETCH_BUDGETS, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionBudgetTypes.DELETE_BUDGET]({ commit }, payload) {
    try {
      await budgetService.deleteBudget(payload.id);
      commit(MutationBudgetTypes.DELETE_BUDGET, { id: payload.id });
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionBudgetTypes.PATCH_BUDGET]({ commit }, payload: MoneyOperation) {
    try {
      await budgetService.patchBudget(payload);
      commit(MutationBudgetTypes.PATCH_BUDGET, payload);
    } catch (error) {
      console.log(error);
    }
  },
};

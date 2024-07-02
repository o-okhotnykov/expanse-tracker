import { budgetService } from "@/services/BudgetService";
import { ActionContext, ActionTree } from "vuex";
import { MutationBudgetTypes, MutationsBudget } from "./mutations";
import { BudgetState } from "./state";
import { RootState } from "..";
import { createBudgetSchema } from "@expanse-tracker/server/src";

export enum ActionBudgetTypes {
  POST_BUDGET = "POST_BUDGET",
  FETCH_BUDGETS = "FETCH_BUDGETS",
  DELETE_BUDGET = "DELETE_BUDGET",
  PATCH_BUDGET = "PATCH_BUDGET",
}

type AugmentedActionContext = {
  commit<K extends keyof MutationsBudget>(
    key: K,
    payload: Parameters<MutationsBudget[K]>[1]
  ): ReturnType<MutationsBudget[K]>;
} & Omit<ActionContext<BudgetState, RootState>, "commit">;

export interface ActionsBudgets {
  [ActionBudgetTypes.POST_BUDGET](
    { commit }: AugmentedActionContext,
    payload: createBudgetSchema
  ): Promise<void>;
  [ActionBudgetTypes.FETCH_BUDGETS]({
    commit,
  }: AugmentedActionContext): Promise<void>;
  // [ActionBudgetTypes.DELETE_BUDGET](
  //   { commit }: AugmentedActionContext,
  //   payload: { id: string }
  // ): Promise<void>;
  // [ActionBudgetTypes.PATCH_BUDGET](
  //   { commit }: AugmentedActionContext,
  //   payload: MoneyOperation
  // ): Promise<void>;
}

export const budgetsActions: ActionTree<BudgetState, RootState> &
  ActionsBudgets = {
  async [ActionBudgetTypes.POST_BUDGET](
    { commit },
    payload: createBudgetSchema
  ) {
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
  // async [ActionBudgetTypes.DELETE_BUDGET]({ commit }, payload) {
  //   try {
  //     await budgetService.deleteBudget(payload.id);
  //     commit(MutationBudgetTypes.DELETE_BUDGET, { id: payload.id });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // async [ActionBudgetTypes.PATCH_BUDGET]({ commit }, payload: MoneyOperation) {
  //   try {
  //     await budgetService.patchBudget(payload);
  //     commit(MutationBudgetTypes.PATCH_BUDGET, payload);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

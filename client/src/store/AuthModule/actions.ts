import { ActionContext, ActionTree } from "vuex";
import { MutationAuthTypes, Mutations } from "./mutations";
import { AuthState } from "./state";
import { loginSchema, registerSchema } from "@/types/auth";
import { authService } from "@/services/AuthService";
import { RootState } from "@/store";

export enum ActionAuthTypes {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthState, RootState>, "commit">;

export interface Actions {
  [ActionAuthTypes.REGISTER_USER](
    { commit }: AugmentedActionContext,
    payload: registerSchema
  ): Promise<void>;
  [ActionAuthTypes.LOGIN_USER](
    { commit }: AugmentedActionContext,
    payload: loginSchema
  ): Promise<void>;
}

export const actions: ActionTree<AuthState, RootState> & Actions = {
  async [ActionAuthTypes.REGISTER_USER]({ commit }, payload: registerSchema) {
    try {
      const data = await authService.registerUser(payload);
      commit(MutationAuthTypes.REGISTER_USER, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionAuthTypes.LOGIN_USER]({ commit }, payload: loginSchema) {
    try {
      const data = await authService.loginUser(payload);
      commit(MutationAuthTypes.LOGIN_USER, data);
    } catch (error) {
      console.log(error);
    }
  },
};

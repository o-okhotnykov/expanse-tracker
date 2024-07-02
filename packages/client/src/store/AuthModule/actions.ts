import { ActionContext, ActionTree } from "vuex";
import {
  RegisterUserInput,
  GetCurrentUserInput,
  LoginUserInput,
} from "@expanse-tracker/server/src";
import { authService } from "@/services/AuthService";
import { RootState } from "@/store";
import { MutationAuthTypes, MutationsAuth } from "./mutations";
import { AuthState } from "./state";

export enum ActionAuthTypes {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  GET_ME = "GET_ME",
}

type AugmentedActionContext = {
  commit<K extends keyof MutationsAuth>(
    key: K,
    payload?: Parameters<MutationsAuth[K]>[1]
  ): ReturnType<MutationsAuth[K]>;
} & Omit<ActionContext<AuthState, RootState>, "commit">;

export interface ActionsAuth {
  [ActionAuthTypes.REGISTER_USER](
    { commit }: AugmentedActionContext,
    payload: RegisterUserInput
  ): Promise<void>;
  [ActionAuthTypes.LOGIN_USER](
    { commit }: AugmentedActionContext,
    payload: LoginUserInput
  ): Promise<void>;
  [ActionAuthTypes.LOGOUT_USER]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<AuthState, RootState> & ActionsAuth = {
  async [ActionAuthTypes.REGISTER_USER]({ commit }, payload) {
    try {
      const data = await authService.registerUser(payload);

      commit(MutationAuthTypes.REGISTER_USER, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionAuthTypes.LOGIN_USER]({ commit }, payload) {
    try {
      const data = await authService.loginUser(payload);

      commit(MutationAuthTypes.LOGIN_USER, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [ActionAuthTypes.GET_ME]({ commit }, payload) {
    try {
      const data = await authService.getMe(payload);

      commit(MutationAuthTypes.GET_ME, data);
    } catch (error) {
      console.log(error);
    }
  },
  [ActionAuthTypes.LOGOUT_USER]({ commit }) {
    commit(MutationAuthTypes.LOGOUT_USER);
  },
};

import { MutationTree } from "vuex";
import { AuthState } from "./state";
import {
  GetCurrentUserOutput,
  LoginUserOutput,
  RegisterUserOutput,
} from "@expanse-tracker/server/src";

export enum MutationAuthTypes {
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  GET_ME = "GET_ME",
  LOGOUT_USER = "LOGOUT_USER",
}

export type MutationsAuth<S = AuthState> = {
  [MutationAuthTypes.LOGIN_USER](state: S, payload: LoginUserOutput): void;
  [MutationAuthTypes.REGISTER_USER](
    state: S,
    payload: RegisterUserOutput
  ): void;
  [MutationAuthTypes.GET_ME](state: S, payload: GetCurrentUserOutput): void;
  [MutationAuthTypes.LOGOUT_USER](state: S): void;
};

export const mutations: MutationTree<AuthState> & MutationsAuth = {
  [MutationAuthTypes.LOGIN_USER](state, payload) {
    state.user = payload;
    state.accessToken = payload.userToken;
  },
  [MutationAuthTypes.REGISTER_USER](state, payload) {
    state.user = payload;
    state.accessToken = payload.userToken;
  },
  [MutationAuthTypes.GET_ME](state, payload) {
    // state.user = payload;
    //state.accessToken = payload.userToken;
  },
  [MutationAuthTypes.LOGOUT_USER](state) {
    state.user = null;
    state.accessToken = null;
  },
};

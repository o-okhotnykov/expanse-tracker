import { MutationTree } from "vuex";
import { AuthState } from "./state";
import { responseUser } from "@/types/auth";

export enum MutationAuthTypes {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
}

export type Mutations<S = AuthState> = {
  [MutationAuthTypes.REGISTER_USER](state: S, payload: responseUser): void;
  [MutationAuthTypes.LOGIN_USER](state: S, payload: responseUser): void;
  [MutationAuthTypes.LOGOUT_USER](state: S): void;
};

export const mutations: MutationTree<AuthState> & Mutations = {
  [MutationAuthTypes.REGISTER_USER](state, payload: responseUser) {
    state.user = payload;
    state.accessToken = payload.user;
  },
  [MutationAuthTypes.LOGIN_USER](state, payload: responseUser) {
    console.log(payload);
    state.user = payload;
    state.accessToken = payload.userToken;
  },
  [MutationAuthTypes.LOGOUT_USER](state) {
    state.user = null;
    state.accessToken = null;
  },
};

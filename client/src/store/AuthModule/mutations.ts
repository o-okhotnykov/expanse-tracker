import { MutationTree } from "vuex";
import { AuthState } from "./state";
import { responseUser } from "@/types/auth";

export enum MutationAuthTypes {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
}

export type Mutations<S = AuthState> = {
  [MutationAuthTypes.REGISTER_USER](state: S, payload: responseUser): void;
  [MutationAuthTypes.LOGIN_USER](state: S, payload: responseUser): void;
};

export const mutations: MutationTree<AuthState> & Mutations = {
  [MutationAuthTypes.REGISTER_USER](state, payload: responseUser) {
    state.user = payload;
  },
  [MutationAuthTypes.LOGIN_USER](state, payload: responseUser) {
    state.user = payload;
  },
};

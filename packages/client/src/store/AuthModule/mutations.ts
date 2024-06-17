import { MutationTree } from "vuex";
import { AuthState } from "./state";
import { responseUser } from "@/types/user";

export enum MutationAuthTypes {
  COMMIT_USER = "COMMIT_USER",
  LOGOUT_USER = "LOGOUT_USER",
}

export type Mutations<S = AuthState> = {
  [MutationAuthTypes.COMMIT_USER](state: S, payload: responseUser): void;
  [MutationAuthTypes.LOGOUT_USER](state: S): void;
};

export const mutations: MutationTree<AuthState> & Mutations = {
  [MutationAuthTypes.COMMIT_USER](state, payload: responseUser) {
    state.user = payload;
    state.accessToken = payload.userToken;
  },
  [MutationAuthTypes.LOGOUT_USER](state) {
    state.user = null;
    state.accessToken = null;
  },
};

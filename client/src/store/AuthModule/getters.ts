import { GetterTree } from "vuex";
import { AuthState } from "./state";
import { RootState } from "..";

export type Getters = {
  isAuthorize(state: AuthState): boolean;
};

export const getters: GetterTree<AuthState, RootState> & Getters = {
  isAuthorize(state) {
    return state.user !== null;
  },
};

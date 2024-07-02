import { GetterTree } from "vuex";
import { AuthState } from "./state";
import { RootState } from "..";

export enum GettersAuthTypes {
  IS_AUTHORIZE = "IS_AUTHORIZE",
}

export type GettersAuth = {
  [GettersAuthTypes.IS_AUTHORIZE](state: AuthState): boolean;
};

export const getters: GetterTree<AuthState, RootState> & GettersAuth = {
  [GettersAuthTypes.IS_AUTHORIZE]: (state) => {
    return state.user !== null;
  },
};

import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module,
} from "vuex";
import { RootState } from "@/store";
import { ActionAuthTypes, ActionsAuth, actions } from "./actions";
import { GettersAuthTypes, GettersAuth, getters } from "./getters";
import { MutationAuthTypes, MutationsAuth, mutations } from "./mutations";
import { AuthState, state } from "./state";
export type { AuthState, ActionsAuth, GettersAuth, MutationsAuth };
export { MutationAuthTypes, ActionAuthTypes, GettersAuthTypes };

export type AuthStore<S = AuthState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof MutationsAuth,
    P extends Parameters<MutationsAuth[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<MutationsAuth[K]>;
} & {
  dispatch<K extends keyof ActionsAuth>(
    key: K,
    payload?: Parameters<ActionsAuth[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionsAuth[K]>;
} & {
  getters: {
    [K in keyof GettersAuth]: ReturnType<GettersAuth[K]>;
  };
};

export const moduleAuth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

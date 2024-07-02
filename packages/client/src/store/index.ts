import {
  CommitOptions,
  DispatchOptions,
  Store,
  createStore,
  useStore as vuexUseStore,
} from "vuex";
import { InjectionKey } from "vue";
import VuexPersistence from "vuex-persist";
import {
  ActionAuthTypes,
  ActionsAuth,
  MutationAuthTypes,
  MutationsAuth,
  GettersAuthTypes,
  GettersAuth,
  AuthState,
  AuthStore,
  moduleAuth,
} from "./AuthModule";
import {
  BudgetState,
  BudgetsStore,
  moduleBudget,
  ActionBudgetTypes,
  ActionsBudgets,
  MutationBudgetTypes,
  MutationsBudget,
  GetterBudgetsTypes,
  GettersBudgets,
} from "./BudgetModule";

export type RootState = {
  auth: AuthState;
  budgets: BudgetState;
};

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
});

export const rootStoreKey: InjectionKey<Store<RootState>> = Symbol();

export type RootStore = AuthStore<Pick<RootState, "auth">> &
  BudgetsStore<Pick<RootState, "budgets">>;

function rootStoreToNamespacedStore<
  ActionTypes,
  Actions extends { [key: string]: any },
  MutationsTypes,
  Mutations extends { [key: string]: any },
  GetterTypes,
  Getters extends { [key: string]: any },
  StateType
>(namespace: string, store: Store<any>) {
  return {
    getters<K extends keyof Getters>(
      getterType: GetterTypes
    ): ReturnType<Getters[K]> {
      return store.getters[`${namespace}/${getterType}`];
    },
    dispatch<K extends keyof Actions>(
      payloadWithType: ActionTypes,
      payload?: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]> {
      return store.dispatch(
        `${namespace}/${payloadWithType}`,
        payload,
        options
      ) as ReturnType<Actions[K]>;
    },
    commit<K extends keyof Mutations>(
      payloadWithType: MutationsTypes,
      payload: Parameters<Mutations[K]>[1],
      options?: CommitOptions
    ): void {
      return store.commit(`${namespace}/${payloadWithType}`, payload, options);
    },
    state: store.state[namespace] as StateType,
  };
}

export const rootStore = createStore({
  plugins: [vuexLocal.plugin],
  modules: {
    auth: moduleAuth,
    budget: moduleBudget,
  },
});

export function useStore(): RootStore {
  const store = vuexUseStore(rootStoreKey);
  return store;
}

export function useBudgetsStore() {
  const store = vuexUseStore(rootStoreKey);
  return rootStoreToNamespacedStore<
    ActionBudgetTypes,
    ActionsBudgets,
    MutationBudgetTypes,
    MutationsBudget,
    GetterBudgetsTypes,
    GettersBudgets,
    BudgetState
  >("budgets", store);
}

export function useAuthStore() {
  const store = vuexUseStore(rootStoreKey);
  return rootStoreToNamespacedStore<
    ActionAuthTypes,
    ActionsAuth,
    MutationAuthTypes,
    MutationsAuth,
    GettersAuthTypes,
    GettersAuth,
    AuthState
  >("auth", store);
}

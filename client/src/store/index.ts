import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { AuthState, AuthStore, moduleAuth } from "./AuthModule";
import { BudgetState, BudgetsStore, moduleBudget } from "./BudgetModule";

export type RootState = {
  auth: AuthState;
  budgets: BudgetState;
};

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
});

export type Store = AuthStore<Pick<RootState, "auth">> &
  BudgetsStore<Pick<RootState, "budgets">>;

export const store = createStore({
  plugins: [vuexLocal.plugin],
  modules: {
    auth: moduleAuth,
    budget: moduleBudget,
  },
});

export function useStore(): Store {
  return store as Store;
}

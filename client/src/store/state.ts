import { MoneyOperation } from "./types";

export interface State {
  budgets: MoneyOperation[];
  balance: number;
}

export const state: State = {
  budgets: [],
  balance: 0,
};

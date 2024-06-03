import { responseUser } from "@/types/auth";
import { MoneyOperation } from "./types";

export interface State {
  budgets: MoneyOperation[];
  balance: number;
  user: responseUser | null;
}

export const state: State = {
  budgets: [],
  balance: 0,
  user: null,
};

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../routes";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type FetchBudgetsInput = RouterInput["budget"]["getAllBudgets"];
export type FetchBudgetsOutput = RouterOutput["budget"]["getAllBudgets"];

export type CreateBudgetInput = RouterInput["budget"]["postBudget"];
export type CreateBudgetOutput = RouterOutput["budget"]["postBudget"];

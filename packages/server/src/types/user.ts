import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../routes";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type LoginUserInput = RouterInput["user"]["login"];
export type LoginUserOutput = RouterOutput["user"]["login"];

export type RegisterUserInput = RouterInput["user"]["register"];
export type RegisterUserOutput = RouterOutput["user"]["register"];

export type GetCurrentUserInput = RouterInput["user"]["getMe"];
export type GetCurrentUserOutput = RouterOutput["user"]["getMe"];

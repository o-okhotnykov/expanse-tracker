import { router } from "../trpc";
import { budgetRouter } from "./budget.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  user: userRouter,
  budget: budgetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

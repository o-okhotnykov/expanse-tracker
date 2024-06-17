import {
  getMeValidation,
  loginValidation,
  registerValidation,
} from "../validations/validation";
import { login, register, getMe } from "../controllers/UserController";
import { procedure, router } from "../trpc";

export const userRouter = router({
  login: procedure.input(loginValidation).mutation(async ({ input }) => {
    return await login(input);
  }),
  register: procedure.input(registerValidation).mutation(async ({ input }) => {
    return await register(input);
  }),
  getMe: procedure.input(getMeValidation).query(async ({ input }) => {
    return await getMe(input);
  }),
});

import {
  registerSchema,
  loginSchema,
  getMeSchema,
} from "../../../server/src/validations";
import { trpc } from "./trpc";

class AuthService {
  async registerUser(payload: registerSchema) {
    const result = await trpc.user.register.mutate(payload);

    return result;
  }

  async loginUser(payload: loginSchema) {
    const result = await trpc.user.login.mutate(payload);

    return result;
  }
  async getMe(payload: getMeSchema) {
    const result = await trpc.user.getMe.query(payload);

    return result;
  }
}

export const authService = new AuthService();

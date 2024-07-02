import {
  RegisterUserInput,
  LoginUserInput,
  GetCurrentUserInput,
} from "@expanse-tracker/server/src";
import { trpc } from "./trpc";

class AuthService {
  async registerUser(payload: RegisterUserInput) {
    const result = await trpc.user.register.mutate(payload);

    return result;
  }

  async loginUser(payload: LoginUserInput) {
    const result = await trpc.user.login.mutate(payload);

    return result;
  }
  async getMe(payload: GetCurrentUserInput) {
    const result = await trpc.user.getMe.query(payload);

    return result;
  }
}

export const authService = new AuthService();

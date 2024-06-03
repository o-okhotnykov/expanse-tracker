import { BASE_URL, HttpService } from "./HttpService";
import { loginSchema, registerSchema, responseUser } from "@/types/auth";

const AUTH = "/auth";

enum AuthRoutes {
  REGISTER = "/register",
  LOGIN = "/login",
  me = "/me",
}

class AuthService {
  private apiService: HttpService;
  constructor() {
    this.apiService = new HttpService(BASE_URL);
  }

  async registerUser(payload: registerSchema) {
    const { data } = await this.apiService.post<responseUser>(
      AUTH + AuthRoutes.REGISTER,
      payload
    );

    return data;
  }

  async loginUser(payload: loginSchema) {
    const { data } = await this.apiService.post<responseUser>(
      AUTH + AuthRoutes.LOGIN,
      payload
    );

    return data;
  }
}

export const authService = new AuthService();

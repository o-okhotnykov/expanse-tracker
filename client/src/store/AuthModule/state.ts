import { responseUser } from "@/types/auth";

export interface AuthState {
  user: responseUser | null;
  accessToken: string | null;
}

export const state: AuthState = {
  user: null,
  accessToken: null,
};

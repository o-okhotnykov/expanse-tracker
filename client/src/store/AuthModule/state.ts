import { responseUser } from "@/types/auth";

export interface AuthState {
  user: responseUser | null;
}

export const state: AuthState = {
  user: null,
};

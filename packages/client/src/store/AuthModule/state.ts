import { LoginUserOutput as responseUser } from "@expanse-tracker/server/src";

export interface AuthState {
  user: responseUser | null;
  accessToken: string | null;
}

export const state: AuthState = {
  user: null,
  accessToken: null,
};

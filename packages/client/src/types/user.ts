export interface registerSchema {
  fullName: string;
  email: string;
  password: string;
}

export interface loginSchema {
  email: string;
  password: string;
}

export interface responseUser {
  fullName: string;
  email: string;
  id: string;
  userToken: string;
}

export interface Error {
  message: string;
}

export interface userSchema {
  fullName: string;
  email: string;
  passwordHash: string;
  _doc: userSchema;
}

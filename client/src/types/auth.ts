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
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
}

export interface Error {
  message: string;
}

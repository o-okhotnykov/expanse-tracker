import { loginSchema, registerSchema } from "@expanse-tracker/shared";
import { Schema, object, string } from "yup";

export const validateExpanseSchema = {
  name(value: string) {
    if (value?.length >= 2) return true;

    return "Name needs to be at least 2 characters.";
  },
  amount(value: number) {
    if (value > 0) return true;

    return "Value needs to be number and has to be bigger than 0.";
  },
  category(value: string) {
    if (value) return true;

    return "Select an item.";
  },
};

export const validateIncomeSchema = {
  amount(value: number) {
    if (value > 0) return true;

    return "Value needs to be number and has to be bigger than 0.";
  },
  category(value: string) {
    if (value) return true;

    return "Select an item.";
  },
};

export const registerSchemaValidation: Schema<registerSchema> = object({
  email: string().email().required("Email is required."),
  password: string().required("Password is required."),
  fullName: string().required("Full name is required."),
});
export const loginSchemaValidation: Schema<loginSchema> = object({
  email: string().email().required("Email is required."),
  password: string().required("Password is required."),
});

export const validateRegisterSchema = {
  email(value: string) {
    if (value) return true;

    return "Email is required.";
  },
};

import { body } from "express-validator";
import { z } from "zod";

export const registerValidation = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Must have at least 6 character" }),
  fullName: z.string().min(1, { message: "This field has to be filled." }),
});

export const loginValidation = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(6, { message: "Must have at least 6 character" }),
});

export const getMeValidation = z.object({
  userId: z.string().min(1, { message: "This field has to be filled." }),
});

export type getMeSchema = z.infer<typeof getMeValidation>;
export type loginSchema = z.infer<typeof loginValidation>;
export type registerSchema = z.infer<typeof registerValidation>;

export const budgetValidation = [
  body("name").isLength({ min: 3 }).withMessage("Invalid name"),
  body("amount").isNumeric().withMessage("Invalid amount"),
  body("date").isISO8601().withMessage("Invalid date"),
  body("type").isString(),
  body("category").isLength({ min: 3 }).withMessage("Invalid type"),
];

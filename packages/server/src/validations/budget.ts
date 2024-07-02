import { Types } from "mongoose";
import { ExpanseCategory, IncomeCategory } from "./categories";
import { z } from "zod";

export const getAllBudgets = z.object({
  // userId: z.string().min(1, { message: "This field has to be filled." }),
});
export const deleteBudget = z.object({
  postId: z.string().min(1, { message: "This field has to be filled." }),
});

export const createBudget = z.object({
  _id: z.instanceof(Types.ObjectId),
  name: z.string().min(1, { message: "This field has to be filled." }),
  amount: z.number({ message: "Invalid amount" }),
  date: z.date({ message: "Invalid date" }),
  type: z.enum(["expanse", "income"]),
  category: z.union([
    z.nativeEnum(ExpanseCategory),
    z.nativeEnum(IncomeCategory),
  ]),
});

export const updateBudget = z.object({
  postId: z.string(),
  name: z.string().min(1, { message: "This field has to be filled." }),
  amount: z.number({ message: "Invalid amount" }),
  date: z.date({ message: "Invalid date" }),
  type: z.enum(["expanse", "income"]),
  category: z.union([
    z.nativeEnum(ExpanseCategory),
    z.nativeEnum(IncomeCategory),
  ]),
});

export type getAllBudgetsSchema = z.infer<typeof getAllBudgets>;
export type deleteBudgetSchema = z.infer<typeof deleteBudget>;
export type createBudgetSchema = z.infer<typeof createBudget>;
export type updateBudgetSchema = z.infer<typeof updateBudget>;
export type budgetSchema = z.infer<typeof createBudget>;

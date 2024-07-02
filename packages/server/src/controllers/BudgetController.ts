import { NextFunction, Request, Response } from "express";
import BudgetModel from "../models/Budget";
import {
  budgetSchema,
  createBudgetSchema,
  deleteBudgetSchema,
  getAllBudgetsSchema,
  updateBudgetSchema,
} from "../validations/budget";
import { TRPCError } from "@trpc/server";

export const postBudget = async (input: createBudgetSchema) => {
  try {
    const doc = new BudgetModel({
      name: input.name,
      amount: input.amount,
      date: input.date,
      category: input.category,
      type: input.type,
      // user: input.userId,
    });

    const budget = await doc.save();

    return budget;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const deleteBudget = async (input: deleteBudgetSchema) => {
  try {
    await BudgetModel.findOneAndDelete({ _id: input.postId });
    return { message: "Budget deleted successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const updateBudget = async (input: updateBudgetSchema) => {
  try {
    const { postId, name, amount, date, category, type } = input;
    await BudgetModel.updateOne(
      { _id: postId },
      {
        name,
        amount,
        date,
        category,
        type,
        //  user: req.userId,
      }
    );
    return { message: "Budget updated successfully" };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;

    const budget = await BudgetModel.findById(postId);

    res.json(budget);
  } catch (error) {
    next(error);
  }
};

export const getBudgets = async () => {
  try {
    // const query: { user: string; type?: string } = {
    //   user: input.userId,
    // };

    // if (input.query.type) {
    //   query.type = req.query.type as string;
    // }

    const budgets: budgetSchema[] = await BudgetModel.find();

    return budgets;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

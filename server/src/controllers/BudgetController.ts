import { NextFunction, Request, Response } from "express";
import BudgetModel from "../models/Budget";
import { IGetUserAuthInfoRequest } from "./UserController";

export const createBudget = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = new BudgetModel({
      name: req.body.name,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category,
      type: req.body.type,
      user: req.userId,
    });

    const budget = await doc.save();
    res.json(budget);
  } catch (error) {
    next(error);
  }
};

export const deleteBudget = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;

    await BudgetModel.findOneAndDelete({ _id: postId });
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateBudget = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;

    await BudgetModel.updateOne(
      { _id: postId },
      {
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.category,
        type: req.body.type,
        user: req.userId,
      }
    );
    res.json({ message: "Budget updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const getBudget = async (
  req: IGetUserAuthInfoRequest,
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

export const getAllBudgets = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: { user: string; type?: string } = {
      user: req.userId,
    };

    if (req.query.type) {
      query.type = req.query.type as string;
    }

    const budgets = await BudgetModel.find(query);

    res.json(budgets);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

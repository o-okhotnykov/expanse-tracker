import { Request, Response } from "express";
import BudgetModel from "../models/Budget";
import { IGetUserAuthInfoRequest } from "./UserController";

export const createBudget = async (
  req: IGetUserAuthInfoRequest,
  res: Response
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
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBudget = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const postId = req.params.id;

    await BudgetModel.findOneAndDelete({ _id: postId });
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBudget = async (
  req: IGetUserAuthInfoRequest,
  res: Response
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
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBudget = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const postId = req.params.id;

    const budget = await BudgetModel.findById(postId);

    res.json(budget);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBudgets = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const budgets = await BudgetModel.find();
    res.json(budgets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

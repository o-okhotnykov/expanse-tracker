import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import { AppError, HttpCode } from "../exceptions/AppError";

export interface IGetUserAuthInfoRequest extends Request {
  userId: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash: _, ...userData } = user._doc;

    res.json({ ...userData, userToken: token });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash: _, ...userData } = user._doc;

    res.json({ ...userData, userToken: token });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    }
    const { passwordHash: _, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    next(error);
  }
};

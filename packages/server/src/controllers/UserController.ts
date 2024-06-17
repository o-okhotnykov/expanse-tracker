import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, HttpCode } from "../exceptions/AppError";
import { registerSchema, loginSchema, getMeSchema } from "../validations";
import { TRPCError } from "@trpc/server";
import userModel from "../models/User";

export const register = async (input: registerSchema) => {
  try {
    const password = input.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new userModel({
      email: input.email,
      fullName: input.fullName,
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

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      userToken: token,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const login = async (input: loginSchema) => {
  try {
    const user = await userModel.findOne({ email: input.email });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const isValidPass = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValidPass) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
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

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      userToken: token,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getMe = async (input: getMeSchema) => {
  try {
    const user = await userModel.findById(input.userId);
    if (!user) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    }

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

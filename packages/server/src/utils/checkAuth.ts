import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../exceptions";
import { TokenInterface } from "../types/token";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        `${process.env.JWT_SECRET}`
      ) as TokenInterface;

      req.userId = decoded._id;
      next();
    } catch (err) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Unauthorized",
      });
    }
  } else {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      description: "Unauthorized",
    });
  }
};

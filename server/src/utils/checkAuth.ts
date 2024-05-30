import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { TokenInterface } from "../types/token";
import { IGetUserAuthInfoRequest } from "../controllers/UserController";
import { AppError, HttpCode } from "../exceptions";

export default (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded: TokenInterface = jwt.verify(token, "secret");
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

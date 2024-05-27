import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { TokenInterface } from "../types/token";
import { IGetUserAuthInfoRequest } from "../controllers/UserController";

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
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
};

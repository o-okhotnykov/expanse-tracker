import { Response } from "express";
import { AppError } from "./AppError";

class ErrorHandler {
  public handleError(error: AppError, response: Response): void {
    response.status(error.httpCode).json({ message: error.message });
  }
}

export const errorHandler = new ErrorHandler();

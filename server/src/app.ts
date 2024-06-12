import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter, budgetRouter } from "./routes";
import { AppError, errorHandler } from "./exceptions";
import "dotenv/config";

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@database.828hvnq.mongodb.net/budget?retryWrites=true&w=majority&appName=database`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/budgets", budgetRouter);

//Error handle
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log("Status code:", err.httpCode || 500);
  console.log("Error encountered:", err.message || err);
  next(err);
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

app.listen(process.env.PORT, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.PORT}`
  );
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter, budgetRouter } from "./routes";

mongoose
  .connect(
    "mongodb+srv://admin:admin@database.828hvnq.mongodb.net/budget?retryWrites=true&w=majority&appName=database"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();
const port = 3004;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/budgets", budgetRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

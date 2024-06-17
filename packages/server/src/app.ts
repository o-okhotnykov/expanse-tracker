import express from "express";
import mongoose from "mongoose";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import "dotenv/config";
import { appRouter } from "./routes/app";
import { createContext } from "./trpc";

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

const main = async () => {
  const app = express();
  app.use(cors());

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.listen(process.env.PORT, () => {
    console.log(`api-server listening at http://localhost:${process.env.PORT}`);
  });
};

main();

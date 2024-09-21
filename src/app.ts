import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});
//Global Error Handler

app.use(globalErrorHandler);

export default app;

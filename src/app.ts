import express from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});
//middlewares
app.use('/api/users', userRouter);


//Global Error Handler
app.use(globalErrorHandler);

export default app;

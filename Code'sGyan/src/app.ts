import express from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json())

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});
//middlewares
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);



//Global Error Handler
app.use(globalErrorHandler);

export default app;

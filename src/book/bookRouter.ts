import express from "express";
import { createBook } from "./bookController";


const bookRouter = express.Router();

//Routes

bookRouter.post('/books', createBook);




export default bookRouter;

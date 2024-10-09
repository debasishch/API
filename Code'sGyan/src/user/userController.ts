import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

// Function to create a new user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, "User already exists with this email"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // Return response with token
    res.status(201).json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error creating user or generating token"));
  }
};

// Function to log in a user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(String(password), String(user.password));
    if (!isMatch) {
      return next(createHttpError(400, "Incorrect email or password"));
    }

    // Generate JWT token
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // Return response with token
    res.json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error during login process"));
  }
};

export { createUser, loginUser };

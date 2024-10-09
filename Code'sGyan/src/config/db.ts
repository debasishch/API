import mongoose from "mongoose";
import { config } from "./config";
import { error } from "console";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", () => {
      console.log("Error in connecting to the database", error);
    });
    await mongoose.connect(config.databaseURL as string);
  } catch (error) {
    console.error("Failed to Connect", error);
    process.exit(1);
  }
};

export default connectDB;

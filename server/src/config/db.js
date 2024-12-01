import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

export default async function connectDB() {
  try {
    console.log("hochu tebya");
    await mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@cluster0.jckgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("db done");
  } catch (error) {
    console.error("error: ", error);
  } finally {
    console.log("connection closed");
  }
}

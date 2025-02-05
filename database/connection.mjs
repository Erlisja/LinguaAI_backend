import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Global configuration
const MONGO_URI = process.env.MONGO_URI;
const db = mongoose.connection;

//Connect to MongoDB
mongoose.connect(MONGO_URI);
mongoose.connection.once("open", () => {
    console.log("Database is connected successfully!! 🎉");
    });

//Export the database connection
export default db;
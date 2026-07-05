import mongoose from "mongoose";

//---we dont need below 2 lines bcoz we'll be calling them from index.js
// import dotenv from "dotenv";
// dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connected to mongodb ${conn.connection.host}`);
  } catch (error) {
    console.log("faile to connect to mongoDB " + error);
    process.exit(1); //1 is failure 0 is success
  }
};

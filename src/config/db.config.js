import mongoose from "mongoose";

async function ConnectionDb() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("Missing Mongo Uri In .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDb Connects Error", error);
  }
}

export default ConnectionDb;

import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
import ConnectionDb from "./config/db.config.js";
import cookieParser from "cookie-parser";
const app = express();
//basic config
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// dbconnectio
ConnectionDb();

//routes
import authRoute from "./routes/auth.routes.js";
import instructorRoute from './routes/instructor.routes.js';
import studentRoute from "./routes/student.routes.js"
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/instructor",instructorRoute);
app.use("/api/v1/student",studentRoute);
export default app;

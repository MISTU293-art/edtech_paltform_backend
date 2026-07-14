import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import {dbConnection} from "../src/config/db.config.js"
dotenv.config({
    path: "./.env"
});
console.log(process.cwd());
console.log(process.env.MONGODB_URI);
const PORT=process.env.PORT
await dbConnection();
app.listen(PORT,()=>{
    console.log(`Server Run On http://localhost:${PORT}`)
})
import express from "express"
const app=express();

app.get('/',(req,res)=>{
    res.send("Hi")
});
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));
import registerRoute from "../src/routes/register.routers.js";
import verifyRoute from "../src/routes/verify.routes.js"
app.use("/api/v1/auth",registerRoute);
app.use("/api/v1/auth",verifyRoute);


export default app;
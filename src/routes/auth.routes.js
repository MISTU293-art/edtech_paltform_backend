import { Router } from "express";
import express from "express";
import { registeruser, loginUser } from "../controllers/auth.controllers.js";
const router = express.Router();
router.post("/register", registeruser);
router.post("/login", loginUser);

export default router;

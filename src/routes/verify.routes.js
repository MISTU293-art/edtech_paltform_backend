import { Router } from "express";
import { verifyController } from "../controllers/verify.controller.js";

const router = Router();

router.get("/verify/:token", verifyController);

export default router;
import express from 'express';
import { Router } from 'express';
import {allCourse,buyCourse,viewPurchasedCourse} from '../controllers/student.controllers.js';
import { authStudent } from '../middlewares/auth.middleware.js';
const router = express.Router();
router.get("/",allCourse);
router.post("/buy",authStudent,buyCourse);
router.get("/view_buy",authStudent,viewPurchasedCourse)
export default router
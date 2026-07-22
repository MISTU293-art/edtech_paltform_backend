import express from 'express';
import { Router } from 'express';
import multer from 'multer';
import {authInstructor} from '../middlewares/auth.middleware.js'
import {createCourse,courseSellAnalysis} from '../controllers/instructor.controller.js';
const upload = multer({storage:multer.memoryStorage()})
const router=express.Router();
router.post("/create-course",authInstructor,upload.single("file"),createCourse);
router.get("/analysis",authInstructor,courseSellAnalysis)
export default router;
import express from "express";
import { Router } from "express";
import multer from "multer";
import { authInstructor } from "../middlewares/auth.middleware.js";
import {
  createCourse,
  courseSellAnalysis,
  deleteCourse,
  updateCourse,
} from "../controllers/instructor.controllers.js";
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
router.post(
  "/create-course",
  authInstructor,
  upload.single("file"),
  createCourse,
);
router.get("/analysis", authInstructor, courseSellAnalysis);
router.delete("/delete/:_id", authInstructor, deleteCourse);
router.put("/update-course/:_id", authInstructor, updateCourse);
export default router;

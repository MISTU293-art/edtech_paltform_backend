import express from 'express';
import { Router } from 'express';
import {allCourse} from '../controllers/student.controllers.js';
const router = express.Router();
router.get("/",allCourse);
export default router
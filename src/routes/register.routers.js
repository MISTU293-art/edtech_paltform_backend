
import { Router } from "express";
import {createUser} from "../controllers/register.controller.js"
const router=Router();

router.route("/register").post(createUser);

export default router
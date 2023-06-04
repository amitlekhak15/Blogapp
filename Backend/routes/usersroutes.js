import express from "express";
const router=express.Router()
import {getalluser, login} from "../controllers/userscontrollers.js";
import { signup } from "../controllers/userscontrollers.js";
router.get("/",getalluser)
router.post("/signup",signup)
router.post("/login",login)

export default router
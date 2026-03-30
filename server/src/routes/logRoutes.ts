import { Router } from "express";
import { receivelog } from "../controllers/logController.js";
const router = Router()

router.post("/",receivelog)

export default router
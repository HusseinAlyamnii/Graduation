import { Router } from "express";
import { cvController } from "../controllers/cv.controller.js";

const router = Router();

// WIP: all cv endpoints
router.get('/All-CV', cvController.getAllCVs)

export default router;

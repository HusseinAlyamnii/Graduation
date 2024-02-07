import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

// WIP: continue working here for any other endpoints for user model

router.post('/signinUser', userController.signIn);
router.post('/signupUser', userController.signUp);

export default router;
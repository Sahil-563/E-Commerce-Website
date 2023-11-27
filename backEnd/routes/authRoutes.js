import express from 'express';
import {registerController,loginController,privateController} from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/private",requireSignIn,isAdmin, privateController);
export default router
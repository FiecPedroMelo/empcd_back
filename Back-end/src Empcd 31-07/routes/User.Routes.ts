import { Router } from "express";
import userController from "../controllers/User.Controllers";

const router = Router();

router.post('/login', new userController().loginUser);
router.post('/signUp', new userController().signUpUser);

export default router;
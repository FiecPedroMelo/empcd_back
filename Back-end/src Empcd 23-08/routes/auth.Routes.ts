import { Router } from "express";
import userController from "../controllers/User.Controllers";
import { upload } from "../config/multer-config";

const authRouter = Router();

authRouter.post('/login', new userController().loginUser)
authRouter.post('/sign-up', new userController().signUpUser)
authRouter.post('/batch-sign-up', upload.single('csvFile'), new userController().signUpUsersInBatch)
export default authRouter;
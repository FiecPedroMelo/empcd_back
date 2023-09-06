import { Router } from "express";
import userController from "../controllers/User.Controllers";

const Userrouter = Router();

Userrouter.post('/login', new userController().loginUser);
Userrouter.post('/signUp', new userController().signUpUser);
Userrouter.post('batch-sign-up', new userController().signUpUsersInBatch);

export default Userrouter;
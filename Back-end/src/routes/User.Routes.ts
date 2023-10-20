import { Router } from "express";
import userController from "../controllers/User.Controllers";

const Userrouter = Router();

Userrouter.post('/login', new userController().loginUser); //ok?
Userrouter.post('/signUp', new userController().signUpUser); //ok
// Userrouter.post('/batch-sign-up', new userController().signUpUsersInBatch); tempo perdido

export default Userrouter;
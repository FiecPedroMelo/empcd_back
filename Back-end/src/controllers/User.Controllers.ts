import { Request, Response } from "express";
import UserService from "../services/User.Service";

class UserController {
        async loginUser(req: Request, res: Response){
            const {email, password} = req.body;
            try {
                const token = await new UserService().loginUser(email, password);
                res.status(200).send({token: token});
            } catch(err) {
                res.status(401).send("Login Failed");
            }
        }

        async signUpUser(req: Request, res: Response){
            const {email, password, name} = req.body;
            try {
                await new UserService().signUpUser(name, email, password);
                res.json('Bem criado!');
            } catch (err) {
                console.log(err);
            }
            
        }

        async signUpUsersInBatch(req:Request, res:Response) {
            const newUser = req.file
            console.log(req)
            if (!newUser) {
                return res.status(403).send('error importing user')
            }
            const savedUser = await new UserService().signUpUsersInBatch(req);
            res.json(`request saved with successful ${JSON.stringify(savedUser)}`);
        }

}

export default UserController;
import { Request, Response} from "express";
import userService from "../services/User.Service";

class userController {
    async loginUser(req: Request, res: Response) {
        const {email, password} = req.body;
        await new userService().loginUser(email, password);
    }
    async signUpUser(req: Request, res: Response) {
        const {name, email, password} = req.body;
        await new userService().signUpUser(name, email, password);
    }
}

export default userController
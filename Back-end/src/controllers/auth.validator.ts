import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { SECRET } from "../constants";

export async function validator(req: Request, res: Response, next: NextFunction){
    const bearerHeader = req.headers['authorization'];
    const bearerMiddle = bearerHeader?.split(' ');
    const bearerjson = JSON.stringify(bearerMiddle);
    const bearerString = JSON.parse(bearerjson);
    const bearer: jwt.Secret = bearerString.toString();
    const bearerToken = jwt.sign(req.params, bearer);
    try{
        const token = await jwt.verify(bearerToken || '', SECRET) as any;
        (req as any).authUser = {id: token.id};
        if(token) {
            next();
            return;
        }
        res.status(403).send("User not allowed 1");
    } catch(err){
        res.status(403).send("Failure finding user");
    }
}
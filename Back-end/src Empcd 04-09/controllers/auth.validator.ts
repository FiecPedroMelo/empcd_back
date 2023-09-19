import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { SECRET } from "../constants";

export async function validator(req: Request, res: Response, next: NextFunction){
    const bearerHeader = req.headers['authorization'];
    const bearerMiddle = bearerHeader?.split(' ');
    const bearerSecret = JSON.stringify(bearerMiddle);
    const chegadeBearer = JSON.parse(bearerSecret);
    const bearer: jwt.Secret = chegadeBearer.toString();
    const bearerToken = jwt.sign(req.params, bearer);
    try{
    const token = await jwt.verify(bearerToken || '', SECRET) as any;
        (req as any).authUser = {id: token.id};
        console.log(req.headers.authUser);
        if(token) {
            next();
            return;
        }
        res.status(403).send("User not allowed 1");
    } catch(err){
        res.status(403).send("User not allowed 2");
    }
}
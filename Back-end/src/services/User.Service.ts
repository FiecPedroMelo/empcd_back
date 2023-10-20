import { v4 } from "uuid";
import { Request } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import * as jwt from 'jsonwebtoken';
import { User } from "../models/entities/User";
import userRepository from "../models/repositories/User.repositories";
import logger from "../config/logger";
import { SECRET } from "../constants";

class userService {
    
    getUserFromData(name: string, email: string, password: string) : User{
        const newUser = new User();
        newUser.id = v4();
        newUser.email = email;
        newUser.name = name;
        const hashDigest = sha256(password);
        logger.debug("HashAntes: ", hashDigest)
        const privateKey = "FIEC2023"
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey ))
        logger.debug("HashDepois: ",hashDigest)
        newUser.password = hmacDigest;
        return newUser;
    }

    async loginUser(email: string, password: string) {
        try{
            const hashDigest = sha256(password);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "FIEC2023"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey ))
            logger.debug("HashDepois: ",hashDigest)
            const foundUser = await userRepository.findOneBy({email, password: hmacDigest});
            if (foundUser) {
                const token = jwt.sign({id: foundUser.id, email: foundUser.email, password: foundUser.password}, SECRET);
                const validation: boolean = true;
                return {token, validation}
            } else {
                const token = '';
                const validation: boolean = false;
                return {token, validation}
            }

        } catch (err) {
            return 'User not found' + err;
        }
        
    }

    async signUpUser(name: string, email:string, password: string) {
        try{
            const newUser = new User();
            newUser.id = v4();
            newUser.email = email;
            newUser.name = name;
            const hashDigest = sha256(password);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "FIEC2023"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
            logger.debug("HashDepos: ",hashDigest)
            newUser.password = hmacDigest;
            await userRepository.save(newUser);
        } catch (err) {
            console.log(err);
            return 'Failed to sign Up' + err;
        }
        
    }

    async signUpUsersInBatch(req: Request){
        const file = req.body;
        const users : User[] = [];
        if(file != null) {
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => users.push(this.getUserFromData(data.name, data.email, data.password)))
                .on('end', () => {
                    console.log(users);
                    userRepository.insert(users);
            });
        }
    }
}

export default userService;
import User from "../models/entities/User";
import userRepository from "../models/repositories/User.repositories";
import logger from "../config/logger";
import { v4 } from "uuid";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'

class userService {

    async loginUser(email: string, password: string) {
        const foundUser = userRepository.findOneBy({email, password});
        return foundUser;
    }

    async signUpUser(name: string, email:string, password: string) {
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
    }
}

export default userService;
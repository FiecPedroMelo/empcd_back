"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/entities/User"));
const User_repositories_1 = __importDefault(require("../models/repositories/User.repositories"));
const logger_1 = __importDefault(require("../config/logger"));
const uuid_1 = require("uuid");
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const hmac_sha512_1 = __importDefault(require("crypto-js/hmac-sha512"));
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
class userService {
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = User_repositories_1.default.findOneBy({ email, password });
            return foundUser;
        });
    }
    signUpUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default();
            newUser.id = (0, uuid_1.v4)();
            newUser.email = email;
            newUser.name = name;
            const hashDigest = (0, sha256_1.default)(password);
            logger_1.default.debug("HashAntes: ", hashDigest);
            const privateKey = "FIEC2023";
            const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
            logger_1.default.debug("HashDepos: ", hashDigest);
            newUser.password = hmacDigest;
            yield User_repositories_1.default.save(newUser);
        });
    }
}
exports.default = userService;

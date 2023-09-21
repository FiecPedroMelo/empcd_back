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
const uuid_1 = require("uuid");
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const hmac_sha512_1 = __importDefault(require("crypto-js/hmac-sha512"));
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
const User_1 = require("../models/entities/User");
const User_repositories_1 = __importDefault(require("../models/repositories/User.repositories"));
const logger_1 = __importDefault(require("../config/logger"));
class userService {
    getUserFromData(name, email, password) {
        const newUser = new User_1.User();
        newUser.id = (0, uuid_1.v4)();
        newUser.email = email;
        newUser.name = name;
        const hashDigest = (0, sha256_1.default)(password);
        logger_1.default.debug("HashAntes: ", hashDigest);
        const privateKey = "FIEC2023";
        const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
        logger_1.default.debug("HashDepois: ", hashDigest);
        newUser.password = hmacDigest;
        return newUser;
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = User_repositories_1.default.findOneBy({ email, password });
            return foundUser;
        });
    }
    signUpUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.User();
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
    signUpUsersInBatch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.body;
            const users = [];
            if (file != null) {
                fs_1.default.createReadStream(file.path)
                    .pipe((0, csv_parser_1.default)())
                    .on('data', (data) => users.push(this.getUserFromData(data.name, data.email, data.password)))
                    .on('end', () => {
                    console.log(users);
                    User_repositories_1.default.insert(users);
                });
            }
        });
    }
}
exports.default = userService;
